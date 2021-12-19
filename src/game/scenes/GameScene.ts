import Phaser from 'phaser';

import { SCENE_GAME, SCENE_MENU } from '../../constants/sceneName';
import CrossPipe from '../objects/pipes/CrossPipe';
import CurvedPipe from '../objects/pipes/CurvedPipe';
import LongPipe from '../objects/pipes/LongPipe';
import ShortPipe from '../objects/pipes/ShortPipe';
import TShapedPipe from '../objects/pipes/TShapedPipe';
import { GamePauseData } from './transition/gameTransitionData';

class GameScene extends Phaser.Scene {
  constructor() {
    super(SCENE_GAME);
  }

  create() {
    const long = new LongPipe(this, 100, 100);
    const short = new ShortPipe(this, 132, 100);
    const cross = new CrossPipe(this, 164, 100);
    const tShaped = new TShapedPipe(this, 196, 100);
    const curved = new CurvedPipe(this, 228, 100, '┛');

    long.enableRotation();
    short.enableRotation();
    cross.enableRotation();
    tShaped.enableRotation();
    curved.enableRotation();

    const escKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

    escKey.on(Phaser.Input.Keyboard.Events.DOWN, () => {
      this.pause();
    });
  }

  private pause() {
    this.scene.sleep();

    const data: GamePauseData = {
      isPause: true,
      resume: () => {
        this.scene.stop(SCENE_MENU);
        this.scene.wake(SCENE_GAME);
      },
      restart: () => {
        this.scene.stop(SCENE_MENU);
        this.scene.stop(SCENE_GAME);
        this.scene.start(SCENE_GAME);
      },
    };

    this.scene.run(SCENE_MENU, data);
  }
}

export default GameScene;
