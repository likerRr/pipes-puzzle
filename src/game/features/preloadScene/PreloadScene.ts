import { SCENE_MENU, SCENE_PRELOAD } from '../../../constants/sceneName';
import BrowserWebSocketService from '../../../lib/ws/BrowserWebSocketService';
import WebSocketClient from '../../../lib/wsClient/WebSocketClient';
import Game from '../game/Game';
import WsClientRegistry from '../registry/WsClientRegistry';
import FireworksTexture from '../../objects/fireworks/FireworksTexture';
import PipesTexture from '../../resources/PipesTexture';

class PreloadScene extends Phaser.Scene {
  constructor() {
    super(SCENE_PRELOAD);
  }

  preload() {
    new PipesTexture(this).preload();
    new FireworksTexture(this).preload();
  }

  create() {
    let reconnecting = false;
    let reconnectingAttempts = 0;
    const reconnectingAttemptsLimit = 5;

    const ws = new BrowserWebSocketService({
      address: process.env.NEXT_PUBLIC_WEBSOCKET_URL as string,
      onClose: () => {
        if (reconnectingAttempts >= reconnectingAttemptsLimit) {
          // TODO show something
          return;
        }

        this.time.delayedCall(2000 * Math.max(1, reconnectingAttempts), () => {
          ws.connect();

          reconnectingAttempts += 1;
          reconnecting = true;
        });
      },
      onOpen: () => {
        if (reconnecting) {
          Game.restartScenesToMenu(this);
        }

        reconnectingAttempts = 0;
        reconnecting = false;

        const wsClient = new WebSocketClient(ws);

        WsClientRegistry.setWsClient(this.registry, wsClient);

        this.scene.start(SCENE_MENU);
      },
    });

    ws.connect();
  }
}

export default PreloadScene;
