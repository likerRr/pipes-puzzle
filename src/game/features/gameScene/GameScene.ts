import Phaser from 'phaser';

import { SCENE_GAME } from '../../../constants/sceneName';
import { Message, MessageVerifyData } from '../../../lib/wsClient/messages/Message';
import MessageConverter from '../../../lib/wsClient/MessageConverter';
import Device from '../device/Device';
import GameSceneCreateData from './GameSceneCreateData';
import GameSceneUI from './GameSceneUI';
import MapDrawer from '../map/MapDrawer';
import MatrixPresenter from '../map/MatrixPresenter';
import MatrixMask from '../map/MatrixMask';
import WsClientRegistry from '../registry/WsClientRegistry';
import GameService from '../game/GameService';

class GameScene extends Phaser.Scene {
  constructor() {
    super(SCENE_GAME);
  }

  create(sceneData: GameSceneCreateData) {
    const matrixPresenter = new MatrixPresenter(sceneData.map);
    const matrixMask = new MatrixMask(matrixPresenter, {
      rowsOffset: 0,
      colsOffset: 0,
      visibleCols: 8,
      visibleRows: 8,
    });
    const wsClient = WsClientRegistry.getWsClient(this.registry);
    const gameService = new GameService(this, wsClient);
    const mapDrawer = new MapDrawer(this, {
      onPipeClick: (x, y, value) => {
        ui.handlePipeClick(x, y, value);
        wsClient.send(MessageConverter.toRotate(x, y));
      },
    });
    const device = new Device(this);
    const ui = new GameSceneUI(
      this,
      sceneData.level,
      mapDrawer,
      matrixPresenter,
      matrixMask,
      device,
    );

    ui.draw({
      onSubmitClick() {
        wsClient.send(MessageConverter.toVerify());
      },
      onPause: () => {
        ui.pauseGame(level => {
          gameService.startNewGame(level);
        });
      },
    });

    wsClient.on<MessageVerifyData>(Message.Verify, data => {
      if (data.isIncorrect) {
        ui.handleFailSubmit();

        return;
      }

      if (data.isOk) {
        ui.finishLevel(data.password);

        return;
      }

      if (data.isLimit) {
        ui.handleLimitReached();
      }
    });
  }
}

export default GameScene;
