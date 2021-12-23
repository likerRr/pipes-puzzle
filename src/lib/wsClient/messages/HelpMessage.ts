import { MessageHelpData } from './Message';
import MessageParser from './MessageParser';

class HelpMessage extends MessageParser<MessageHelpData> {
  protected parse() {
    return this.payload;
  }
}

export default HelpMessage;
