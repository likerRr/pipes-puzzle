class MatrixPresenter<T> {
  constructor(
    private matrix: T[][],
  ) {
  }

  getMatrix() {
    return this.matrix;
  }

  updateAt(x: number, y: number, value: T) {
    this.matrix[y][x] = value;
  }

  getWidth() {
    return this.matrix[0].length;
  }

  getHeight() {
    return this.matrix.length;
  }
}

export default MatrixPresenter;
