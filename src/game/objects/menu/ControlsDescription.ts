import Phaser from 'phaser';

const defaultStyle: Phaser.Types.GameObjects.Text.TextStyle = {
  align: 'center',
  font: '24px Arial',
  color: 'rgba(104,143,182,0.51)',
};

class ControlsDescription extends Phaser.GameObjects.Text {
  constructor(
    scene: Phaser.Scene,
    x: number = 0,
    y: number = 0,
  ) {
    const text = `
Controls:
- Press ESC to enter Menu
- Use arrows to move a map (starting from Normal)
`;

    super(scene, x, y, text, defaultStyle);

    scene.add.existing(this);
  }
}

export default ControlsDescription;
