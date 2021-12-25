import { TEXTURE_PIPES } from '../../constants/textureName';
import PreloadedTexture from './PreloadedTexture';

class PipesTexture extends PreloadedTexture {
  preload(): void {
    this.scene.load.atlas(
      TEXTURE_PIPES,
      'assets/pipes-64x64.png',
      'assets/pipes-64x64_atlas.json',
    );
  }
}

export default PipesTexture;
