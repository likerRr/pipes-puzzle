import Phaser from 'phaser';

import MenuButton from './MenuButton';

class RestartMenuButton extends MenuButton {
  constructor(scene: Phaser.Scene, y?: number) {
    super(scene, 'Restart', {
      alignHorizontally: 'center',
      top: y,
    });
  }
}

export default RestartMenuButton;
