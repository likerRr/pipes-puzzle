import Phaser from 'phaser';

import MenuButton from './MenuButton';

class ContinueMenuButton extends MenuButton {
  constructor(scene: Phaser.Scene, y?: number) {
    super(scene, 'Continue', {
      alignHorizontally: 'center',
      top: y,
    });
  }
}

export default ContinueMenuButton;
