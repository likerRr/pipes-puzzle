import Phaser from 'phaser';

import { SCENE_END_GAME } from '../../../constants/sceneName';
import EndGameSceneCreateData from './EndGameSceneCreateData';
import EndGameUI from './EndGameUI';
import Game from '../game/Game';
import GameService from '../game/GameService';
import WsClientRegistry from '../registry/WsClientRegistry';

class EndGameScene extends Phaser.Scene {
  constructor() {
    super(SCENE_END_GAME);
  }

  create(data: EndGameSceneCreateData) {
    const wsClient = WsClientRegistry.getWsClient(this.registry);
    const gameService = new GameService(this, wsClient);
    const ui = new EndGameUI(this, () => {
      gameService.startNewGame(Game.getNextLevel(data.level));
    });

    ui.show(data.password);
  }
}

export default EndGameScene;
