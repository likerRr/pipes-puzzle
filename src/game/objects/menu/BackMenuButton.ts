import Phaser from 'phaser';

import MenuButton from './MenuButton';

class BackMenuButton extends MenuButton {
  constructor(scene: Phaser.Scene, y?: number) {
    super(scene, 'Back', {
      alignHorizontally: 'center',
      top: y,
    });
  }
}

export default BackMenuButton;
