import Phaser from 'phaser';

import Pipe, { PipeVariant, PipeVariants } from './Pipe';

type PipeFactory = {
  pattern: PipeVariants,
  create(scene: Phaser.Scene, x: number, y: number, initialValue?: PipeVariant): Pipe;
}

export default PipeFactory;
