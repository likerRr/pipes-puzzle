import Phaser from 'phaser';

import { TEXTURE_PIPES_FRAME } from '../../../../constants/textureName';
import PipeFactory from './PipeFactory';
import Pipe, { PipeVariant } from './Pipe';
import PipeTile from './PipeTile';

const ShortPipeFactory: PipeFactory = {
  pattern: ['╸', '╹', '╺', '╻'],
  create(scene: Phaser.Scene, x: number, y: number, initialValue?: PipeVariant) {
    return new Pipe(
      new PipeTile(scene, x, y, TEXTURE_PIPES_FRAME.Short),
      ShortPipeFactory.pattern,
      initialValue,
    );
  }
}

export default ShortPipeFactory;
