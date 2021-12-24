import Phaser from 'phaser';

import { SCENE_END_GAME, SCENE_GAME, SCENE_MENU } from '../../../constants/sceneName';
import { Message, MessageVerifyData } from '../../../lib/wsClient/messages/Message';
import WebSocketClient from '../../../lib/wsClient/WebSocketClient';
import GameSceneUI from './GameSceneUI';
import startNewGame from './startNewGame';
import MapDrawer from '../map/MapDrawer';
import MatrixPresenter from '../map/MatrixPresenter';
import MatrixMask from '../map/MatrixMask';
import WsClientRegistry from '../registry/WsClientRegistry';
import Container from '../../../lib/phaser/Container';
import { GamePauseData, MapDoneData } from '../../scenes/transition/gameTransitionData';
import { MenuStartGameData } from '../../scenes/transition/menuTransitionData';

class GameScene extends Phaser.Scene {
  constructor() {
    super(SCENE_GAME);
  }

  create(sceneData: MenuStartGameData) {
    const matrixPresenter = new MatrixPresenter(sceneData.map);
    const matrixMask = new MatrixMask(matrixPresenter, {
      rowsOffset: 0,
      colsOffset: 0,
      visibleCols: 10,
      visibleRows: 10,
    });
    const wsClient = WsClientRegistry.getWsClient(this.registry);
    const mapWidth = matrixPresenter.getWidth();
    const mapHeight = matrixPresenter.getHeight();

    const ui = new GameSceneUI(this, {
      level: sceneData.level,
      sizeH: mapWidth,
      sizeV: mapHeight,
      onSubmitClick() {
        wsClient.send(WebSocketClient.getVerify());
      },
    });

    const mapDrawer = new MapDrawer(this, {
      onPipeClick(x, y, value) {
        wsClient.send(WebSocketClient.getRotate(x, y));
        matrixPresenter.updateAt(x, y, value);
      },
    });

    const drawMap = () => {
      mapDrawer.draw(matrixMask.apply());
      mapDrawer.withContainer(container => Container.alignInCamera(container, this.cameras.main));

      const bounds = mapDrawer.getBounds();
      const mask = matrixMask.getBounds();

      if (mapWidth > mask.visibleCols) {
        ui.updateHorizontalMapLegend({
          atX: bounds.x + bounds.width,
          atY: bounds.y,
          text: `${mask.colsOffset}-${mask.colsOffset + mask.visibleCols}`,
        });
      }

      if (mapHeight > mask.visibleRows) {
        ui.updateVerticalMapLegend({
          atX: bounds.x,
          atY: bounds.y + bounds.height,
          text: `${mask.rowsOffset}-${mask.rowsOffset + mask.visibleRows}`,
        });
      }
    }

    drawMap();

    const cursors = this.input.keyboard.createCursorKeys();

    cursors.right.on(Phaser.Input.Keyboard.Events.DOWN, () => {
      matrixMask.moveRight(1);
      drawMap();
    });

    cursors.left.on(Phaser.Input.Keyboard.Events.DOWN, () => {
      matrixMask.moveLeft(1);
      drawMap();
    });

    cursors.down.on(Phaser.Input.Keyboard.Events.DOWN, () => {
      matrixMask.moveDown(1);
      drawMap();
    });

    cursors.up.on(Phaser.Input.Keyboard.Events.DOWN, () => {
      matrixMask.moveUp(1);
      drawMap();
    });

    this.input.on(Phaser.Input.Events.POINTER_MOVE, (p: Phaser.Input.Pointer) => {
      if (!p.isDown) {
        return;
      }

      if (p.rightButtonDown()) {
        mapDrawer.withContainer(container => {
          container.x += (p.x - p.prevPosition.x);
          container.y += (p.y - p.prevPosition.y);
        });
      }
    });

    mapDrawer.withContainer(container => {
      const containerInitialPos = {
        x: container.x,
        y: container.y,
      };

      this.input.on(Phaser.Input.Events.POINTER_UP, (p: Phaser.Input.Pointer) => {
        if (
          p.rightButtonReleased()
          && (
            container.x !== containerInitialPos.x
            || container.y !== containerInitialPos.y
          )
        ) {
          this.tweens.add({
            targets: container,
            x: containerInitialPos.x,
            y: containerInitialPos.y,
            ease: Phaser.Math.Easing.Cubic.Out,
            duration: 300,
          });
        }
      });
    });

    const escKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

    escKey.on(Phaser.Input.Keyboard.Events.DOWN, () => {
      this.pause(sceneData.level);
    });

    wsClient.on<MessageVerifyData>(Message.Verify, data => {
      if (data.isIncorrect) {
        this.cameras.main.shake(200, 0.01);
      }

      if (data.isOk) {
        this.finish(sceneData.level, data.password);

        return;
      }

      if (data.isLimit) {
        this.scene.start(SCENE_MENU, {
          wasted: true,
        });
      }
    });
  }

  private finish(level: number, password: string) {
    this.scene.stop();

    const data: MapDoneData = {
      level,
      password,
    };

    this.scene.start(SCENE_END_GAME, data);
  }

  // TODO replace to events
  private pause(level: number) {
    this.scene.sleep();

    const data: GamePauseData = {
      isPause: true,
      resume: () => {
        this.scene.stop(SCENE_MENU);
        this.scene.wake(SCENE_GAME);
      },
      restart: () => {
        this.scene.stop(SCENE_MENU);

        startNewGame(this, level);
      },
    };

    this.scene.run(SCENE_MENU, data);
  }
}

export default GameScene;
