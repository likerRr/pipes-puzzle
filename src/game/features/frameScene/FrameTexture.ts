import { TEXTURE_FRAME } from '../../../constants/textureName';
import PreloadedTexture from '../../objects/resources/PreloadedTexture';

class FrameTexture extends PreloadedTexture {
  preload(): void {
    this.scene.load.image(TEXTURE_FRAME, 'assets/frame.png');
  }
}

export default FrameTexture;
