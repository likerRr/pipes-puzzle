import ProgressStorage, { ProgressData } from './ProgressStorage';

class ProgressLocalStorage implements ProgressStorage {
  static KEY = 'pipes-puzzle_progress';

  set(progress: ProgressData) {
    localStorage.setItem(ProgressLocalStorage.KEY, JSON.stringify(progress));
  }

  get(): ProgressData | null {
    try {
      const data = localStorage.getItem(ProgressLocalStorage.KEY) as string;

      return JSON.parse(data) as ProgressData;
    } catch (err) {
      return null;
    }
  }

  delete() {
    localStorage.removeItem(ProgressLocalStorage.KEY);
  }
}

export default ProgressLocalStorage
