import Phaser from 'phaser';

import { TEXTURE_FLARES } from '../../../constants/textureName';

class Fireworks {
  private readonly config;

  constructor(
    private scene: Phaser.Scene,
  ) {
    this.config = {
      alpha: { start: 1, end: 0, ease: 'Cubic.easeIn', },
      angle: { start: 0, end: 360, steps: 100, },
      blendMode: 'ADD',
      frame: {
        frames: ['red', 'yellow', 'green', 'blue'],
        cycle: true,
        quantity: 500,
      },
      frequency: 800,
      gravityY: 300,
      lifespan: 1000,
      quantity: 500,
      reserve: 500,
      scale: { min: 0.05, max: 0.15 },
      speed: { min: 300, max: 600 },
    };
  }

  show(x: number, y: number) {
    const particles = this.scene.add.particles(TEXTURE_FLARES);
    const emitter = particles.createEmitter({
      ...this.config,
      x,
      y,
    });
    const { FloatBetween } = Phaser.Math;
    const { width, height } = this.scene.scale;

    this.scene.time.addEvent({
      delay: 500,
      repeat: -1,
      callback: () => {
        emitter.setPosition(width * FloatBetween(0.25, 0.75), height * FloatBetween(0, 0.5));
      },
    });
  }
}

export default Fireworks;
