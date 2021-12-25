import { TEXTURE_PIPES } from '../../../../constants/textureName';
import PreloadedTexture from '../../../objects/resources/PreloadedTexture';

class PipesTexture extends PreloadedTexture {
  static SIZE = 64;

  preload(): void {
    this.scene.load.atlas(
      TEXTURE_PIPES,
      'assets/pipes-64x64.png',
      'assets/pipes-64x64_atlas.json',
    );
  }
}

export default PipesTexture;
