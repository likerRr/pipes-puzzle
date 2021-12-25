import Phaser from 'phaser';

import { SCENE_ENTER_CODE } from '../../../constants/sceneName';
import EnterCodeSceneUI from './EnterCodeSceneUI';

class EnterCodeScene extends Phaser.Scene {
  constructor() {
    super(SCENE_ENTER_CODE);
  }

  create() {
    const ui = new EnterCodeSceneUI(this);

    ui.draw();
  }
}

export default EnterCodeScene;
