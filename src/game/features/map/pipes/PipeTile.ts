import Phaser from 'phaser';

import { TEXTURE_PIPES } from '../../../../constants/textureName';

class PipeTile extends Phaser.GameObjects.Sprite {
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    frame: string,
  ) {
    super(scene, x, y, TEXTURE_PIPES, frame);

    scene.add.existing(this);
  }

  rotate(nextAngle: number, { smooth = false } = {}) {
    const shortestAngle = Phaser.Math.Angle.ShortestBetween(this.angle, nextAngle);

    if (smooth) {
      this.scene.tweens.add({
        angle: this.angle + shortestAngle,
        duration: 80,
        targets: this,
      });
    } else {
      this.angle = nextAngle;
    }
  }
}

export default PipeTile;
