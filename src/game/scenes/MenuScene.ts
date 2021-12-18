import Phaser from 'phaser';

import { SCENE_MENU } from '../../constants/sceneName';
import StartMenuButton from '../objects/StartMenuButton';

class MenuScene extends Phaser.Scene {
  constructor() {
    super(SCENE_MENU);
  }

  create() {
    new StartMenuButton(this);
  }
}

export default MenuScene;
