import { TEXTURE_PIPES } from '../../constants/textureName';
import PreloadedTexture from './PreloadedTexture';

class PipesTexture extends PreloadedTexture {
  preload(): void {
    this.scene.load.atlas(
      TEXTURE_PIPES,
      'assets/pipes-unique.png',
      'assets/pipes-unique_atlas.json',
    );
  }
}

export default PipesTexture;
