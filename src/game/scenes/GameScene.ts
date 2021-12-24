import Phaser from 'phaser';

import difficulty from '../../constants/difficulty';
import { SCENE_END_GAME, SCENE_GAME, SCENE_MENU } from '../../constants/sceneName';
import { Message, MessageRotateData, MessageVerifyData } from '../../lib/wsClient/messages/Message';
import WebSocketClient from '../../lib/wsClient/WebSocketClient';
import startNewGame from '../features/gameScene/startNewGame';
import MapDrawer from '../features/map/MapDrawer';
import MatrixPresenter from '../features/map/MatrixPresenter';
import MatrixMask from '../features/map/MatrixMask';
import WsClientRegistry from '../features/registry/WsClientRegistry';
import Container from '../../lib/phaser/Container';
import SubmitMenuButton from '../objects/menu/SubmitMenuButton';
import { GamePauseData, MapDoneData } from './transition/gameTransitionData';
import { MenuStartGameData } from './transition/menuTransitionData';

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
    const submitButton = new SubmitMenuButton(this, this.scale.height - 100);
    const mapWidth = matrixPresenter.getWidth();
    const mapHeight = matrixPresenter.getHeight();

    this.add.text(30, 30, `${difficulty[sceneData.level]} (${mapWidth}x${mapHeight})`, { font: '32px Arial' });

    submitButton.setOnClickHandler(() => {
      wsClient.send(WebSocketClient.getVerify());
    });

    const mapDrawer = new MapDrawer(this, {
      onPipeClick(x, y, value) {
        wsClient.send(WebSocketClient.getRotate(x, y));
        matrixPresenter.updateAt(x, y, value);
      },
    });

    const textHorizontal = this.add.text(0, 0, '', { font: '24px Arial' });
    const textVertical = this.add.text(0, 0, '', { font: '24px Arial' });

    const redrawMap = () => {
      mapDrawer.draw(matrixMask.apply());
      mapDrawer.withContainer(container => Container.alignInCameraCenter(container, this.cameras.main));

      const bounds = mapDrawer.getBounds();
      const mask = matrixMask.getBounds();
      const littleMargin = 10;

      if (mapWidth > mask.visibleCols) {
        textHorizontal.setText(`${mask.colsOffset}-${mask.colsOffset + mask.visibleCols}`);
        textHorizontal.setPosition(
          bounds.x + bounds.width - textHorizontal.width,
          bounds.y - textHorizontal.height - littleMargin,
        );
      }

      if (mapHeight > mask.visibleRows) {
        textVertical.setText(`${mask.rowsOffset}-${mask.rowsOffset + mask.visibleRows}`);
        textVertical.setPosition(
          bounds.x - textVertical.width - littleMargin,
          bounds.y + bounds.height - textVertical.height,
        );
      }
    }

    redrawMap();

    const cursors = this.input.keyboard.createCursorKeys();

    cursors.right.on(Phaser.Input.Keyboard.Events.DOWN, () => {
      matrixMask.moveRight(1);
      redrawMap();
    });

    cursors.left.on(Phaser.Input.Keyboard.Events.DOWN, () => {
      matrixMask.moveLeft(1);
      redrawMap();
    });

    cursors.down.on(Phaser.Input.Keyboard.Events.DOWN, () => {
      matrixMask.moveDown(1);
      redrawMap();
    });

    cursors.up.on(Phaser.Input.Keyboard.Events.DOWN, () => {
      matrixMask.moveUp(1);
      redrawMap();
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
            ease: 'Power2',
            duration: 300,
          });
        }
      });
    });

    const escKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

    escKey.on(Phaser.Input.Keyboard.Events.DOWN, () => {
      this.pause(sceneData.level);
    });

    wsClient.on<MessageRotateData>(Message.Rotate, isOk => {
      if (!isOk) {
        // TODO show error? restart?
      }
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
        // TODO pass params, like "wasted"
        this.scene.start(SCENE_MENU);
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
