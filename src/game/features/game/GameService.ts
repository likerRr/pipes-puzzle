import Phaser from 'phaser';

import { SCENE_GAME } from '../../../constants/sceneName';
import MessageConverter from '../../../lib/wsClient/MessageConverter';
import { Message, MessageMapData, MessageNewData } from '../../../lib/wsClient/messages/Message';
import WebSocketClient from '../../../lib/wsClient/WebSocketClient';
import GameSceneCreateData from '../gameScene/GameSceneCreateData';

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

    wsClient.send(MessageConverter.toNewMessage(level));

    const offNew = wsClient.on<MessageNewData>(Message.New, isOk => {
      if (!isOk) {
        options?.onNewGameFailure?.();

        return;
      }

      wsClient.send(MessageConverter.toMap());
    });

    const offMap = wsClient.on<MessageMapData>(Message.Map, map => {
      const data: GameSceneCreateData = {
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
