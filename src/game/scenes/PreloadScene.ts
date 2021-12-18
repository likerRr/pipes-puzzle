import { SCENE_MENU, SCENE_PRELOAD } from '../../constants/sceneName';
import PipesTexture from '../resources/PipesTexture';

class PreloadScene extends Phaser.Scene {
  constructor() {
    super(SCENE_PRELOAD);
  }

  preload() {
    new PipesTexture(this).preload();
  }

  create() {
    this.scene.start(SCENE_MENU);
  }
}

export default PreloadScene;
