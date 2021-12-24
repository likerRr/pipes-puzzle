export interface GamePauseData {
  isPause: boolean,

  resume(): void,

  restart(): void,
}

export interface MapDoneData {
  level: number,
  password: string,
}

export interface GameWastedData {
  wasted: boolean,
}
