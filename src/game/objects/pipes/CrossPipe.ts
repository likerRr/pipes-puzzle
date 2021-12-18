import Phaser from 'phaser';

import { TEXTURE_PIPES } from '../../../constants/textureName';
import PipeTile from './PipeTile';

class CrossPipe extends PipeTile {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, TEXTURE_PIPES, '╋', ['╋', '╋', '╋', '╋']);
  }
}

export default CrossPipe;
