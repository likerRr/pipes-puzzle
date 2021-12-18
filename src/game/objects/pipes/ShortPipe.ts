import Phaser from 'phaser';

import { TEXTURE_PIPES_FRAME } from '../../../constants/textureName';
import Pipe, { PipeVariant } from './Pipe';
import PipeTile from './PipeTile';

class ShortPipe extends Pipe {
  constructor(scene: Phaser.Scene, x: number, y: number, initialValue?: PipeVariant) {
    super(
      new PipeTile(scene, x, y, TEXTURE_PIPES_FRAME.Short),
      ['╸', '╹', '╺', '╻'],
      initialValue,
    );
  }
}

export default ShortPipe;
