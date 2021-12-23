import Phaser from 'phaser';

import WebSocketClient from '../../../lib/wsClient/WebSocketClient';

class WsClientRegistry {
  static setWsClient(registry: Phaser.Data.DataManager, wsClient: WebSocketClient) {
    registry.set('wsClient', wsClient);
  }

  static getWsClient(registry: Phaser.Data.DataManager): WebSocketClient {
    return registry.get('wsClient');
  }
}

export default WsClientRegistry;
