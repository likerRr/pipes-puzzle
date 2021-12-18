import Phaser from 'phaser';

type PipeVariant = string;

type Pipe0angle = PipeVariant;

type Pipe90angle = PipeVariant;

type Pipe180angle = PipeVariant;

type Pipe360angle = PipeVariant;

abstract class PipeTile extends Phaser.GameObjects.Sprite {
  private currentVariantIndex: number = 0;

  protected constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string | Phaser.Textures.Texture,
    frame: string,
    private variants: [Pipe0angle, Pipe90angle, Pipe180angle, Pipe360angle],
  ) {
    super(scene, x, y, texture, frame);

    scene.add.existing(this);

    this.rotateByIndex(this.currentVariantIndex);
  }

  getCurrentVariant() {
    return this.variants[this.currentVariantIndex];
  }

  enableRotation() {
    this.setInteractive();
    this.on(Phaser.Input.Events.POINTER_DOWN, () => {
      this.rotate();
    });
  }

  rotate() {
    const nextVariantIndex = this.getNextIndex();

    this.rotateByIndex(nextVariantIndex);
  }

  rotateTo(variant: PipeVariant) {
    this.invariantVariant(variant);

    const variantIndex = this.variants.indexOf(variant);

    this.rotateByIndex(variantIndex);
  }

  private getNextIndex(): number {
    return Phaser.Math.Wrap(this.currentVariantIndex + 1, 0, this.variants.length);
  }

  private rotateByIndex(variantIndex: number) {
    this.invariantVariantIndex(variantIndex);

    const shortestAngle = Phaser.Math.Angle.ShortestBetween(this.angle, variantIndex * 90);

    this.scene.tweens.add({
      angle: this.angle + shortestAngle,
      duration: 80,
      targets: this,
    });
    this.currentVariantIndex = variantIndex;
  }

  private invariantVariant(variant: PipeVariant) {
    if (!this.variants.includes(variant)) {
      throw new Error(`${variant} not found in [${this.variants.join(', ')}]`);
    }
  }

  private invariantVariantIndex(variantIndex: number) {
    if (variantIndex > this.variants.length - 1) {
      throw new Error(`${variantIndex} is not in [${this.variants.join(', ')}]`);
    }
  }
}

export default PipeTile;
