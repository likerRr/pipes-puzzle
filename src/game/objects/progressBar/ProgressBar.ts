const BLUE = 0x79C0E3FF;
const RED = 0xff2200;
const WHITE = 0xffffff;

class ProgressBar {
  progressBar: Phaser.GameObjects.Graphics;

  progressBarRectangle: Phaser.Geom.Rectangle;

  constructor(private scene: Phaser.Scene) {
    const { main } = scene.cameras;

    this.progressBarRectangle = new Phaser.Geom.Rectangle(0, 0, 0.5 * main.width, 30);
    Phaser.Geom.Rectangle.CenterOn(this.progressBarRectangle, 0.5 * main.width, 0.5 * main.height);
    this.progressBar = scene.add.graphics();
  }

  setValue(value: number) {
    const rect = this.progressBarRectangle;
    const color = (this.scene.load.totalFailed > 0) ? RED : WHITE;

    this.progressBar
      .clear()
      .fillStyle(BLUE)
      .fillRect(rect.x, rect.y, rect.width, rect.height)
      .fillStyle(color)
      .fillRect(rect.x, rect.y, value * rect.width, rect.height);
  }

  destroy() {
    this.progressBar.destroy();
  }
}

export default ProgressBar;
