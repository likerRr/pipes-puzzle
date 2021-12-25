import { Message } from './messages/Message';

class MessageConverter {
  static toNewMessage(level: number) {
    return `${Message.New} ${level}`;
  }

  static toMap() {
    return Message.Map;
  }

  static toRotate(x: number, y: number) {
    return `${Message.Rotate} ${x} ${y}`;
  }

  static toVerify() {
    return Message.Verify;
  }
}

export default MessageConverter;
