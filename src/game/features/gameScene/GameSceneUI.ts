import Phaser from 'phaser';
import { Swipe } from 'phaser3-rex-plugins/plugins/gestures';

import difficulty from '../../../constants/difficulty';
import { SCENE_END_GAME, SCENE_GAME, SCENE_MENU } from '../../../constants/sceneName';
import Container from '../../../lib/phaser/Container';
import { MenuButtonOnClickHandler } from '../../objects/menu/MenuButton';
import SubmitMenuButton from '../../objects/menu/SubmitMenuButton';
import Device from '../device/Device';
import EndGameSceneCreateData from '../endGameScene/EndGameSceneCreateData';
import MapDrawer from '../map/MapDrawer';
import MatrixMask from '../map/MatrixMask';
import MatrixPresenter from '../map/MatrixPresenter';
import { MenuSceneFromLimitReached, MenuSceneFromPause } from '../menuScene/MenuSceneCreateData';

type Swipeable = {
  left: boolean,
  right: boolean,
  down: boolean,
  up: boolean,
}

export type SubmitButtonProps = {
  onSubmitClick: MenuButtonOnClickHandler,
}

export type PauseControlsProps = {
  onPause: (level: number) => void,
}

export type ControlsProps = PauseControlsProps;

export type GameSceneUIProps = PauseControlsProps & SubmitButtonProps;

export type MapLegendProps = {
  atX: number,
  atY: number,
  text: string,
}

class GameSceneUI {
  static MAP_LEGEND_MARGIN = 10;

  private horizontalMapLegend!: Phaser.GameObjects.Text;

  private verticalMapLegend!: Phaser.GameObjects.Text;

  private readonly mapWidth: number;

  private readonly mapHeight: number;

  constructor(
    private scene: Phaser.Scene,
    private level: number,
    private mapDrawer: MapDrawer,
    private matrixPresenter: MatrixPresenter<string>,
    private matrixMask: MatrixMask<string>,
    private device: Device,
  ) {
    this.mapWidth = matrixPresenter.getWidth();
    this.mapHeight = matrixPresenter.getHeight();
  }

  draw(props: GameSceneUIProps) {
    this.createDifficultyLabel();
    this.createSubmitButton(props);
    this.createMapLegend();
    this.drawMap();
    this.initControls(props);
  }

  pauseGame(onStartNewGame: (level: number) => void) {
    this.scene.scene.sleep();

    const data: MenuSceneFromPause = {
      isPause: true,
      resume: () => {
        this.scene.scene.stop(SCENE_MENU);
        this.scene.scene.wake(SCENE_GAME);
      },
      restart: () => {
        this.scene.scene.stop(SCENE_MENU);

        onStartNewGame(this.level);
      },
    };

    this.scene.scene.run(SCENE_MENU, data);
  }

  finishLevel(password: string) {
    this.scene.scene.stop();

    const data: EndGameSceneCreateData = {
      level: this.level,
      password,
    };

    this.scene.scene.start(SCENE_END_GAME, data);
  }

  handleFailSubmit() {
    this.scene.cameras.main.shake(200, 0.01);
  }

  handleLimitReached() {
    const data: MenuSceneFromLimitReached = {
      wasted: true
    };

    this.scene.scene.start(SCENE_MENU, data);
  }

  handlePipeClick(x: number, y: number, value: string) {
    this.matrixPresenter.updateAt(x, y, value);
  }

  private createDifficultyLabel() {
    this.scene.add.text(30, 30, `${difficulty[this.level]} (${this.mapWidth}x${this.mapHeight})`, { font: '32px Arial' });
  }

  private createSubmitButton({ onSubmitClick }: SubmitButtonProps) {
    const submitButton = new SubmitMenuButton(this.scene, this.scene.cameras.main.height - 100);

    submitButton.setOnClickHandler(onSubmitClick);
  }

  private drawMap() {
    const { mapDrawer, matrixMask } = this;

    mapDrawer.draw(matrixMask.apply());
    mapDrawer.withContainer(container => Container.alignInCamera(container, this.scene.cameras.main));

    const bounds = mapDrawer.getBounds();
    const mask = matrixMask.getBounds();

    if (this.mapWidth > mask.visibleCols) {
      this.updateHorizontalMapLegend({
        atX: bounds.x + bounds.width,
        atY: bounds.y,
        text: `${mask.colsOffset}-${mask.colsOffset + mask.visibleCols}`,
      });
    }

    if (this.mapHeight > mask.visibleRows) {
      this.updateVerticalMapLegend({
        atX: bounds.x,
        atY: bounds.y + bounds.height,
        text: `${mask.rowsOffset}-${mask.rowsOffset + mask.visibleRows}`,
      });
    }
  }

  private updateHorizontalMapLegend({ text, atX, atY }: MapLegendProps) {
    const { horizontalMapLegend } = this;

    horizontalMapLegend.setText(text);
    horizontalMapLegend.setPosition(
      atX - horizontalMapLegend.width,
      atY - horizontalMapLegend.height - GameSceneUI.MAP_LEGEND_MARGIN,
    );
  }

  private updateVerticalMapLegend({ text, atX, atY }: MapLegendProps) {
    const { verticalMapLegend } = this;

    verticalMapLegend.setText(text);
    verticalMapLegend.setPosition(
      atX - verticalMapLegend.width - GameSceneUI.MAP_LEGEND_MARGIN,
      atY - verticalMapLegend.height,
    );
  }

  private createMapLegend() {
    this.horizontalMapLegend = this.scene.add.text(0, 0, '', { font: '24px Arial' });
    this.verticalMapLegend = this.scene.add.text(0, 0, '', { font: '24px Arial' });
  }

  private initControls(props: ControlsProps) {
    this.initMapMovementControls();
    this.initMapPointerControls();
    this.initPauseControls(props);
  }

  private initMapMovementControls() {
    const cursors = this.scene.input.keyboard.createCursorKeys();

    cursors.right.on(Phaser.Input.Keyboard.Events.DOWN, () => {
      this.matrixMask.moveRight(1);
      this.drawMap();
    });

    cursors.left.on(Phaser.Input.Keyboard.Events.DOWN, () => {
      this.matrixMask.moveLeft(1);
      this.drawMap();
    });

    cursors.down.on(Phaser.Input.Keyboard.Events.DOWN, () => {
      this.matrixMask.moveDown(1);
      this.drawMap();
    });

    cursors.up.on(Phaser.Input.Keyboard.Events.DOWN, () => {
      this.matrixMask.moveUp(1);
      this.drawMap();
    });

    if (this.device.isTouch()) {
      const swipeGesture = new Swipe(this.scene, {
        enable: true,
        dir: '4dir',
        velocityThreshold: 800,
      });

      swipeGesture.on('swipe', (swipe: Swipeable) => {
        if (swipe.right) {
          this.matrixMask.moveLeft(1);
          this.drawMap();
        } else if (swipe.left) {
          this.matrixMask.moveRight(1);
          this.drawMap();
        } else if (swipe.down) {
          this.matrixMask.moveUp(1);
          this.drawMap();
        } else if (swipe.up) {
          this.matrixMask.moveDown(1);
          this.drawMap();
        }
      });
    }
  }

  private initMapPointerControls() {
    this.scene.input.on(Phaser.Input.Events.POINTER_MOVE, (p: Phaser.Input.Pointer) => {
      if (!p.isDown) {
        return;
      }

      if (p.rightButtonDown()) {
        this.mapDrawer.withContainer(container => {
          container.x += (p.x - p.prevPosition.x);
          container.y += (p.y - p.prevPosition.y);
        });
      }
    });

    this.mapDrawer.withContainer(container => {
      const containerInitialPos = {
        x: container.x,
        y: container.y,
      };

      this.scene.input.on(Phaser.Input.Events.POINTER_UP, (p: Phaser.Input.Pointer) => {
        if (
          p.rightButtonReleased()
          && (
            container.x !== containerInitialPos.x
            || container.y !== containerInitialPos.y
          )
        ) {
          this.scene.tweens.add({
            targets: container,
            x: containerInitialPos.x,
            y: containerInitialPos.y,
            ease: Phaser.Math.Easing.Cubic.Out,
            duration: 300,
          });
        }
      });
    });
  }

  private initPauseControls({ onPause }: PauseControlsProps) {
    const escKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

    escKey.on(Phaser.Input.Keyboard.Events.DOWN, () => onPause(this.level));
  }
}

export default GameSceneUI;
