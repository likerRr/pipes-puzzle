import Phaser from 'phaser';

import MenuButton from './MenuButton';

class StartMenuButton extends MenuButton {
  constructor(scene: Phaser.Scene, y?: number) {
    super(scene, 'Start', {
      alignHorizontally: 'center',
      top: y,
    });
  }
}

export default StartMenuButton;
