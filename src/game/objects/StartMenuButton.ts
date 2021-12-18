import Phaser from 'phaser';

import { SCENE_GAME } from '../../constants/sceneName';
import MenuButton from './MenuButton';

class StartMenuButton extends MenuButton {
  constructor(scene: Phaser.Scene) {
    super(scene, 'Start', {
      alignHorizontally: 'center',
      top: 100,
    });

    this.setOnClickHandler(this.startGame);
  }

  private startGame() {
    this.scene.scene.start(SCENE_GAME);
  }
}

export default StartMenuButton;
