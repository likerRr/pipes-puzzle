import Phaser from 'phaser';

import Device from '../../features/device/Device';

const defaultStyle: Phaser.Types.GameObjects.Text.TextStyle = {
  align: 'left',
  font: '24px Arial',
  color: 'rgba(104,143,182,0.51)',
};

class ControlsDescription extends Phaser.GameObjects.Text {
  constructor(
    scene: Phaser.Scene,
    device: Device,
    x: number = 0,
    y: number = 0,
  ) {
    super(scene, x, y, '', defaultStyle);

    const text = device.isTouch() ? ControlsDescription.getTouchText() : ControlsDescription.getKeyboardText();

    this.setText(text);

    scene.add.existing(this);
  }

  private static getKeyboardText() {
    return `
Controls:
- Press ESC to enter Menu
- Use arrows to move a map (starting from Normal)    
`;
  }

  private static getTouchText() {
    return `
Controls:
- Use swipes to move a map (starting from Normal)    
`;
  }
}

export default ControlsDescription;
