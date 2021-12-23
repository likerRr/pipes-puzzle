import { MessageVerifyData } from './Message';
import MessageParser from './MessageParser';

class VerifyMessage extends MessageParser<MessageVerifyData> {
  protected parse() {
    const isCorrect = this.payload.includes('Correct!');
    const [_, password] = isCorrect ? this.payload.split('Password: ') : [];
    const isLimit = this.payload.includes('Only');
    const isIncorrect = this.payload.includes('Incorrect');

    return {
      isOk: isCorrect,
      isIncorrect,
      password,
      isLimit,
    };
  }
}

export default VerifyMessage;
