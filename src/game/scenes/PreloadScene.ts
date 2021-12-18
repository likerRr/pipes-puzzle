import { SCENE_PRELOAD } from '../../constants/sceneName';
import PipesTexture from '../resources/PipesTexture';

class PreloadScene extends Phaser.Scene {
  constructor() {
    super(SCENE_PRELOAD);
  }

  preload() {
    new PipesTexture(this).preload();
  }
}

export default PreloadScene;
