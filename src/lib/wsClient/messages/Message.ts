export enum Message {
  Help = 'help',
  New = 'new',
  Map = 'map',
  Rotate = 'rotate',
  Verify = 'verify',
  Unknown = 'unknown',
}

export type MessageHelpData = string;

export type MessageMapData = string[][];

export type MessageNewData = boolean;

export type MessageRotateData = boolean;

export type MessageVerifyData = {
  isIncorrect: boolean,
  isLimit: boolean,
  isOk: boolean,
  password: string,
};
