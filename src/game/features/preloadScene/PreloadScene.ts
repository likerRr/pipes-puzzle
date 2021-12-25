import { SCENE_MENU, SCENE_PRELOAD } from '../../../constants/sceneName';
import BrowserWebSocketService from '../../../lib/ws/BrowserWebSocketService';
import WebSocketClient from '../../../lib/wsClient/WebSocketClient';
import LogoTexture from '../../objects/logo/LogoTexture';
import ProgressBar from '../../objects/progressBar/ProgressBar';
import FrameTexture from '../frameScene/FrameTexture';
import Game from '../game/Game';
import WsClientRegistry from '../registry/WsClientRegistry';
import FireworksTexture from '../../objects/fireworks/FireworksTexture';
import PipesTexture from '../map/pipes/PipesTexture';

class PreloadScene extends Phaser.Scene {
  progressBar!: ProgressBar;

  constructor() {
    super(SCENE_PRELOAD);
  }

  preload() {
    new PipesTexture(this).preload();
    new FireworksTexture(this).preload();
    new LogoTexture(this).preload();
    new FrameTexture(this).preload();

    this.progressBar = new ProgressBar(this);
    this.load.on('progress', (val: number) => this.progressBar.setValue(val), this);
    this.load.on('complete', () => this.progressBar.destroy(), this);
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
