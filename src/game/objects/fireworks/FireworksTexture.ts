import { TEXTURE_FLARES } from '../../../constants/textureName';
import PreloadedTexture from '../../resources/PreloadedTexture';

class FireworksTexture extends PreloadedTexture {
  preload(): void {
    this.scene.load.atlas(
      TEXTURE_FLARES,
      'assets/particles/flares.png',
      'assets/particles/flares.json',
    );
  }
}

export default FireworksTexture;
