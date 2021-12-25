export type ProgressData = {
  level: number,
};

type ProgressStorage = {
  set(progress: ProgressData): void;
  get(): ProgressData | null;
  delete(): void;
}

export default ProgressStorage
