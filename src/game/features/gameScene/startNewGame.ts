import Phaser from 'phaser';

import { SCENE_GAME } from '../../../constants/sceneName';
import { Message, MessageMapData, MessageNewData } from '../../../lib/wsClient/messages/Message';
import WebSocketClient from '../../../lib/wsClient/WebSocketClient';
import WsClientRegistry from '../registry/WsClientRegistry';
import { MenuStartGameData } from '../../scenes/transition/menuTransitionData';

export type StartNewGameOptions = {
  onNewGameFailure?: CallableFunction,
};

const startNewGame = (
  scene: Phaser.Scene,
  level: number,
  options?: StartNewGameOptions,
) => {
  const wsClient = WsClientRegistry.getWsClient(scene.registry);

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

    scene.scene.start(SCENE_GAME, data);
  });

  scene.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
    offNew();
    offMap();
  });
};

export default startNewGame;
