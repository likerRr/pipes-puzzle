import Phaser from 'phaser';

import MenuButton from './MenuButton';

class SubmitMenuButton extends MenuButton {
  constructor(scene: Phaser.Scene, y?: number) {
    super(scene, 'Submit', {
      alignHorizontally: 'center',
      top: y,
    });
  }
}

export default SubmitMenuButton;
