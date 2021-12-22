import Phaser from 'phaser';

import PipeTile from './PipeTile';

export type PipeVariant = string;

type Pipe0angle = PipeVariant;

type Pipe90angle = PipeVariant;

type Pipe180angle = PipeVariant;

type Pipe360angle = PipeVariant;

type RotateOptions = {
  smooth: boolean,
};

export type PipeVariants = [Pipe0angle, Pipe90angle, Pipe180angle, Pipe360angle];

const INITIAL_INDEX = 0;

class Pipe {
  private currentVariantIndex: number = INITIAL_INDEX;

  private onClickHandler: (() => void) | undefined;

  constructor(
    private pipeTile: PipeTile,
    private variants: PipeVariants,
    initialValue: PipeVariant = variants[INITIAL_INDEX],
  ) {
    if (initialValue !== variants[INITIAL_INDEX]) {
      this.rotateTo(initialValue);
    }
  }

  addToContainer(container: Phaser.GameObjects.Container) {
    container.add(this.pipeTile);
  }

  getCurrentVariant(): PipeVariant {
    return this.variants[this.currentVariantIndex];
  }

  setOnClickHandler(handler: () => void) {
    this.onClickHandler = handler;
  }

  enableRotation() {
    const onPointerDown = (p: Phaser.Input.Pointer) => {
      if (p.leftButtonDown()) {
        this.rotate();
        this.onClickHandler?.();
      }
    };

    this.pipeTile.setInteractive();
    this.pipeTile.on(Phaser.Input.Events.POINTER_DOWN, onPointerDown);

    this.pipeTile.on(Phaser.GameObjects.Events.DESTROY, () => {
      this.pipeTile.off(Phaser.Input.Events.POINTER_DOWN, onPointerDown);
    });
  }

  rotate(options: RotateOptions = { smooth: true }) {
    const nextVariantIndex = this.getNextIndex();

    this.rotateByIndex(nextVariantIndex, options);
  }

  rotateTo(variant: PipeVariant) {
    this.invariantVariant(variant);

    const variantIndex = this.variants.indexOf(variant);

    this.rotateByIndex(variantIndex);
  }

  private getNextIndex(): number {
    return Phaser.Math.Wrap(this.currentVariantIndex + 1, 0, this.variants.length);
  }

  private rotateByIndex(variantIndex: number, options: RotateOptions = { smooth: false }) {
    this.invariantVariantIndex(variantIndex);

    this.pipeTile.rotate(variantIndex * 90, {
      smooth: options.smooth,
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

export default Pipe;
