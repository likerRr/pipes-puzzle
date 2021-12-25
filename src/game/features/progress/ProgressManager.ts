import ProgressStorage, { ProgressData } from './ProgressStorage';

class ProgressManager {
  constructor(
    private storage: ProgressStorage,
  ) {}

  load(): ProgressData | null {
    return this.storage.get();
  }

  save(data: { level: number }) {
    this.storage.set(data);
  }

  delete() {
    this.storage.delete();
  }
}

export default ProgressManager;
