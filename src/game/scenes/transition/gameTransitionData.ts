export interface GamePauseData {
  isPause: boolean,

  resume(): void,

  restart(): void,
}
