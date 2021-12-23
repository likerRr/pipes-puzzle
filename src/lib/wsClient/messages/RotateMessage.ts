import { MessageRotateData } from './Message';
import MessageParser from './MessageParser';

class RotateMessage extends MessageParser<MessageRotateData> {
  protected parse() {
    return this.payload === 'OK';
  }
}

export default RotateMessage;
