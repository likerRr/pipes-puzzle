import Phaser from 'phaser';

import type MatrixPresenter from './MatrixPresenter';

enum HorizontalDirection {
  Right,
  Left,
}

enum VerticalDirection {
  Up,
  Down,
}

export type MatrixOptions = {
  rowsOffset: number,
  colsOffset: number,
  visibleCols: number,
  visibleRows: number,
};

class MatrixMask<T> {
  constructor(
    private matrixPresenter: MatrixPresenter<T>,
    private options: MatrixOptions,
  ) {}

  getBounds() {
    return this.options;
  }

  apply(): T[][] {
    const { rowsOffset, colsOffset, visibleRows, visibleCols } = this.options;
    const matrix = this.matrixPresenter.getMatrix();
    const newMatrix = [];
    const rowsInView = visibleRows ?? matrix.length;
    const rowsLimit = Phaser.Math.Clamp(rowsOffset + rowsInView, rowsOffset, matrix.length);

    for (let i = rowsOffset; i < rowsLimit; i++) {
      const row = matrix[i];
      const newRow: T[] = [];
      const colsInView = visibleCols ?? row.length;
      const colsLimit = Phaser.Math.Clamp(colsOffset + colsInView, colsOffset, row.length);

      newMatrix.push(newRow);

      for (let j = colsOffset; j < colsLimit; j++) {
        newRow.push(matrix[i][j]);
      }
    }

    return newMatrix;
  }

  moveRight(offset: number) {
    this.moveHorizontally(HorizontalDirection.Right, offset);
  }

  moveLeft(offset: number) {
    this.moveHorizontally(HorizontalDirection.Left, offset);
  }

  moveUp(offset: number) {
    this.moveVertically(VerticalDirection.Up, offset);
  }

  moveDown(offset: number) {
    this.moveVertically(VerticalDirection.Down, offset);
  }

  private moveHorizontally(direction: HorizontalDirection, offset: number) {
    const colsOffset = Phaser.Math.Clamp(
      this.options.colsOffset + offset * Math.sign(direction === HorizontalDirection.Right ? 1 : -1),
      0,
      this.matrixPresenter.getWidth() - this.options.visibleCols,
    );

    this.updateOffset('colsOffset', colsOffset);
  }

  private moveVertically(direction: VerticalDirection, offset: number) {
    const colsOffset = Phaser.Math.Clamp(
      this.options.rowsOffset + offset * Math.sign(direction === VerticalDirection.Down ? 1 : -1),
      0,
      this.matrixPresenter.getHeight() - this.options.visibleRows,
    );

    this.updateOffset('rowsOffset', colsOffset);
  }

  private updateOffset(key: keyof Pick<MatrixOptions, 'colsOffset' | 'rowsOffset'>, value: number) {
    this.options = {
      ...this.options,
      [key]: value,
    };
  }
}

export default MatrixMask;
