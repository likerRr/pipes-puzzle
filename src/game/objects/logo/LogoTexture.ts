import { TEXTURE_LOGO } from '../../../constants/textureName';
import PreloadedTexture from '../resources/PreloadedTexture';

class LogoTexture extends PreloadedTexture {
  preload(): void {
    this.scene.load.image(TEXTURE_LOGO, 'assets/logo.png');
  }
}

export default LogoTexture;
