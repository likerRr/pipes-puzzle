import Phaser from 'phaser';

import { SCENE_GAME } from '../../constants/sceneName';

class GameScene extends Phaser.Scene {
  constructor() {
    super(SCENE_GAME);
  }

  create() {
    console.log('game begins')
  }
}

export default GameScene;
