import Texture from './Texture';

abstract class PreloadedTexture implements Texture {
  constructor(
    protected scene: Phaser.Scene,
  ) {}

  abstract preload(): void;
}

export default PreloadedTexture;
