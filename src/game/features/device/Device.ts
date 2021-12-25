import Phaser from 'phaser';

class Device {
  constructor(
    private scene: Phaser.Scene,
  ) {}

  isTouch() {
    return this.scene.sys.game.device.input.touch;
  }
}

export default Device;
