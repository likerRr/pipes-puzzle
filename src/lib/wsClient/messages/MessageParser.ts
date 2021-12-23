abstract class MessageParser<T> {
  private readonly data: T;

  constructor(
    protected payload: string,
  ) {
    this.data = this.parse();
  }

  getParsedData(): T {
    return this.data;
  }

  protected abstract parse(): T;
}

export default MessageParser;
