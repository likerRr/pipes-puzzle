import Phaser from 'phaser';

import MenuButton from './MenuButton';

class QuitMenuButton extends MenuButton {
  constructor(scene: Phaser.Scene, y?: number) {
    super(scene, 'Quit', {
      alignHorizontally: 'center',
      top: y,
    });
  }
}

export default QuitMenuButton;
