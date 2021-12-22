import Phaser from 'phaser';

import { TEXTURE_PIPES_FRAME } from '../../../constants/textureName';
import PipeFactory from './PipeFactory';
import Pipe, { PipeVariant } from './Pipe';
import PipeTile from './PipeTile';

const LongPipeFactory: PipeFactory = {
  pattern: ['━', '┃', '━', '┃'],
  create(scene: Phaser.Scene, x: number, y: number, initialValue?: PipeVariant) {
    return new Pipe(
      new PipeTile(scene, x, y, TEXTURE_PIPES_FRAME.Long),
      LongPipeFactory.pattern,
      initialValue,
    );
  },
}

export default LongPipeFactory;
