import Phaser from 'phaser';

import levelCodes from '../../../constants/levelCodes';
import { SCENE_ENTER_CODE } from '../../../constants/sceneName';
import { EnterCodeData } from '../../scenes/transition/enterCodeTransitionData';
import GameService from '../game/GameService';
import WsClientRegistry from '../registry/WsClientRegistry';
import EnterCodeSceneUI from './EnterCodeSceneUI';

class EnterCodeScene extends Phaser.Scene {
  constructor() {
    super(SCENE_ENTER_CODE);
  }

  create(data: EnterCodeData) {
    const wsClient = WsClientRegistry.getWsClient(this.registry);
    const gameService = new GameService(this, wsClient);
    const ui = new EnterCodeSceneUI(this);

    ui.draw({
      onEnter(code) {
        const level = levelCodes[code];

        if (level > 0) {
          gameService.startNewGame(level);
        } else {
          ui.handleInvalidCode();
        }
      },
      onBack() {
        data.goBack();
      },
    });
  }
}

export default EnterCodeScene;
