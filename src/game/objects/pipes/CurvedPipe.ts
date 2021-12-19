import Phaser from 'phaser';

import { TEXTURE_PIPES_FRAME } from '../../../constants/textureName';
import Pipe, { PipeVariant, PipeVariants } from './Pipe';
import PipeTile from './PipeTile';

class CurvedPipe extends Pipe {
  static pattern: PipeVariants = ['┏', '┓', '┛', '┗'];

  constructor(scene: Phaser.Scene, x: number, y: number, initialValue?: PipeVariant) {
    super(
      new PipeTile(scene, x, y, TEXTURE_PIPES_FRAME.Curved),
      CurvedPipe.pattern,
      initialValue,
    );
  }
}

export default CurvedPipe;
