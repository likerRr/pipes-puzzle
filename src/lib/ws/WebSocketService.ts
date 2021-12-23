export type SocketData = string;

export type WebSocketConfig = {
  address: string,
  onClose?(): void,
  onOpen?(): void,
}

export interface WebSocketService {
  connect(): void;

  on(type: keyof WebSocketEventMap, handler: (this: WebSocket, ev: Event | CloseEvent | MessageEvent<any>) => any): void;

  send(data: SocketData): void;
}
