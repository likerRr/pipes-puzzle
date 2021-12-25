import EventEmitter from 'events';

import { WebSocketService } from '../ws/WebSocketService';
import HelpMessage from './messages/HelpMessage';
import MapMessage from './messages/MapMessage';
import { Message } from './messages/Message';
import NewMessage from './messages/NewMessage';
import RotateMessage from './messages/RotateMessage';
import VerifyMessage from './messages/VerifyMessage';

type MessageParseConstructor = typeof HelpMessage | typeof NewMessage | typeof MapMessage | typeof RotateMessage | typeof VerifyMessage;

class WebSocketClient {
  private ee = new EventEmitter();

  constructor(private ws: WebSocketService) {
    ws.on('message', evt => {
      const [messageName, messageData] = WebSocketClient.parseMessageData((evt as MessageEvent).data);
      const messagePayload = WebSocketClient.parseMessage(messageName, messageData);

      this.ee.emit(messageName, messagePayload);
    });
  }

  on<T>(message: Message, cb: (data: T) => void) {
    this.ee.on(message, cb);

    return () => {
      this.ee.off(message, cb);
    };
  }

  send(message: string) {
    this.ws.send(message);
  }

  private static parseMessageData(data: string): [Message, any] {
    try {
      const [commandLine, ...rest] = data.split('\r\n');

      if (commandLine === '') {
        const payload = rest.join('\r\n');

        return [Message.Help, payload];
      }

      const [commandName, ...rawPayload] = commandLine.split(':') as [Message, string];
      const payload = rawPayload.join(':').trim();

      if (Object.values(Message).includes(commandName)) {
        return [commandName, payload];
      }

      return [Message.Unknown, payload];
    } catch (err) {
      return [Message.Unknown, null];
    }
  }

  private static parseMessage(messageName: Message, messageData: string) {
    const strategy: { [k: string]: MessageParseConstructor} = {
      [Message.Help]: HelpMessage,
      [Message.New]: NewMessage,
      [Message.Map]: MapMessage,
      [Message.Rotate]: RotateMessage,
      [Message.Verify]: VerifyMessage,
    };
    const MessageParseStrategy = strategy[messageName];

    return MessageParseStrategy ? new MessageParseStrategy(messageData).getParsedData() : null;
  }
}

export default WebSocketClient;
