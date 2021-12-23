import { MessageNewData } from './Message';
import MessageParser from './MessageParser';

class NewMessage extends MessageParser<MessageNewData> {
  protected parse() {
    return this.payload === 'OK';
  }
}

export default NewMessage;
