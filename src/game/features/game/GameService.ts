import Phaser from 'phaser';

import { SCENE_GAME } from '../../../constants/sceneName';
import { Message, MessageMapData, MessageNewData } from '../../../lib/wsClient/messages/Message';
import WebSocketClient from '../../../lib/wsClient/WebSocketClient';
import { MenuStartGameData } from '../../scenes/transition/menuTransitionData';

export type StartNewGameOptions = {
  onNewGameFailure?: CallableFunction,
};

class GameService {
  constructor(
    private scene: Phaser.Scene,
    private wsClient: WebSocketClient,
  ) {}

  startNewGame(level: number, options?: StartNewGameOptions) {
    const { wsClient } = this;

    wsClient.send(WebSocketClient.getNewMessage(level));

    const offNew = wsClient.on<MessageNewData>(Message.New, isOk => {
      if (!isOk) {
        options?.onNewGameFailure?.();

        return;
      }

      wsClient.send(WebSocketClient.getMap());
    });

    const offMap = wsClient.on<MessageMapData>(Message.Map, map => {
      const data: MenuStartGameData = {
        level,
        map,
      };

      this.scene.scene.start(SCENE_GAME, data);
    });

    this.scene.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      offNew();
      offMap();
    });
  }
}

export default GameService;
