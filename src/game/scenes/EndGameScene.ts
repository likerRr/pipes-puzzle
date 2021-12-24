import Phaser from 'phaser';

import { SCENE_END_GAME } from '../../constants/sceneName';
import EndGameUI from '../features/endGameScene/EndGameUI';
import Game from '../features/game/Game';
import GameService from '../features/game/GameService';
import WsClientRegistry from '../features/registry/WsClientRegistry';
import { MapDoneData } from './transition/gameTransitionData';

class EndGameScene extends Phaser.Scene {
  constructor() {
    super(SCENE_END_GAME);
  }

  create(data: MapDoneData) {
    const wsClient = WsClientRegistry.getWsClient(this.registry);
    const gameService = new GameService(this, wsClient);
    const ui = new EndGameUI(this, () => {
      gameService.startNewGame(Game.getNextLevel(data.level));
    });

    ui.show(data.password);
  }
}

export default EndGameScene;
