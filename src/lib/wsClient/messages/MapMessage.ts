import { MessageMapData } from './Message';
import MessageParser from './MessageParser';

class MapMessage extends MessageParser<MessageMapData> {
  protected parse() {
    const matrix: string[][] = [];

    this.payload.split('\n').forEach(row => {
      const matrixRow: Array<string> = [];

      row.split('').forEach(col => {
        matrixRow.push(col);
      });

      matrix.push(matrixRow);
    });

    return matrix;
  }
}

export default MapMessage;
