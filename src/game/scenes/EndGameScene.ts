import Phaser from 'phaser';

import { SCENE_END_GAME } from '../../constants/sceneName';
import EndGameUI from '../features/endGameScene/EndGameUI';
import Game from '../features/gameScene/Game';
import startNewGame from '../features/gameScene/startNewGame';
import { MapDoneData } from './transition/gameTransitionData';

class EndGameScene extends Phaser.Scene {
  constructor() {
    super(SCENE_END_GAME);
  }

  create(data: MapDoneData) {
    const ui = new EndGameUI(this, () => {
      startNewGame(this, Game.getNextLevel(data.level));
    });

    ui.show(data.password);
  }
}

export default EndGameScene;
