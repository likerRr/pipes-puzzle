import Phaser from 'phaser';

import MenuButton from './MenuButton';

class EnterCodeMenuButton extends MenuButton {
  constructor(scene: Phaser.Scene, y?: number) {
    super(scene, 'Enter code', {
      alignHorizontally: 'center',
      top: y,
    });
  }
}

export default EnterCodeMenuButton;
