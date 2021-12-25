import Phaser from 'phaser';

import { SCENE_FRAME } from '../../../constants/sceneName';
import { TEXTURE_FRAME } from '../../../constants/textureName';

class FrameScene extends Phaser.Scene {
  constructor() {
    super(SCENE_FRAME);
  }

  create() {
    this.add.image(0, 0, TEXTURE_FRAME).setOrigin(0, 0);
    this.add.image(0, this.cameras.main.height - 8, TEXTURE_FRAME).setOrigin(1, 1).setAngle(180);
    this.add.image(8, this.cameras.main.height, TEXTURE_FRAME).setOrigin(0, 1).setAngle(-90);
    this.add.image(this.cameras.main.width - 8, this.cameras.main.height, TEXTURE_FRAME).setOrigin(1, 1).setAngle(90);
  }
}

export default FrameScene;
