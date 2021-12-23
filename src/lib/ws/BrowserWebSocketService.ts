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

    const onOpen = () => {
      this.config.onOpen?.();
      this.flushQueue();
    }

    const onClose = () => {
      ws.removeEventListener('open', onOpen);
      ws.removeEventListener('close', onClose);

      this.ws = null;
      this.config.onClose?.();
    };

    ws.addEventListener('open', onOpen);
    ws.addEventListener('close', onClose);

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
