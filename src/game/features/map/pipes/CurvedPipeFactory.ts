import Phaser from 'phaser';

import { TEXTURE_PIPES_FRAME } from '../../../../constants/textureName';
import Pipe, { PipeVariant } from './Pipe';
import PipeFactory from './PipeFactory';
import PipeTile from './PipeTile';

const CurvedPipeFactory: PipeFactory = {
  pattern: ['┏', '┓', '┛', '┗'],
  create(scene: Phaser.Scene, x: number, y: number, initialValue?: PipeVariant) {
    return new Pipe(
      new PipeTile(scene, x, y, TEXTURE_PIPES_FRAME.Curved),
      CurvedPipeFactory.pattern,
      initialValue,
    );
  }
}

export default CurvedPipeFactory;
