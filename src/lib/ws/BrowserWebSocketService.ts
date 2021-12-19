import { SocketData, WebSocketConfig, WebSocketService } from './WebSocketService';

class BrowserWebSocketService implements WebSocketService {
  private ws: WebSocket | null = null;

  private queue: Array<SocketData> = [];

  constructor(
    private config: WebSocketConfig,
  ) {
  }

  connect() {
    if (this.ws) {
      return;
    }

    const ws = new WebSocket(this.config.address);

    ws.addEventListener('open', () => {
      this.config.onOpen?.();
      this.flushQueue();
    });


    this.ws = ws;
  }

  on(type: keyof WebSocketEventMap, handler: (this: WebSocket, ev: Event | CloseEvent | MessageEvent<any>) => any) {
    this.ws?.addEventListener(type, handler);
  }

  send(data: SocketData) {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(data);
    } else {
      this.queue.push(data);
    }
  }

  private flushQueue() {
    this.queue.forEach((data: SocketData) => this.ws?.send(data));
  }
}

export default BrowserWebSocketService;
