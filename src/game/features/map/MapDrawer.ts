import Phaser from 'phaser';

import CrossPipeFactory from './pipes/CrossPipeFactory';
import CurvedPipeFactory from './pipes/CurvedPipeFactory';
import PipeFactory from './pipes/PipeFactory';
import LongPipeFactory from './pipes/LongPipeFactory';
import PipesTexture from './pipes/PipesTexture';
import ShortPipeFactory from './pipes/ShortPipeFactory';
import TShapedPipeFactory from './pipes/TShapedPipeFactory';

export type MapDrawerOptions = {
  onPipeClick?: (rowIndex: number, colIndex: number, value: string) => void,
  x?: number,
  y?: number,
};

class MapDrawer {
  private readonly container: Phaser.GameObjects.Container;

  private pipeFactories: PipeFactory[];

  constructor(
    private scene: Phaser.Scene,
    private options: MapDrawerOptions,
  ) {
    this.container = scene.add.container(options.x, options.y);
    this.pipeFactories = [
      LongPipeFactory,
      ShortPipeFactory,
      CrossPipeFactory,
      TShapedPipeFactory,
      CurvedPipeFactory,
    ];
  }

  draw(map: string[][]) {
    const { scene, container, options: { onPipeClick }, pipeFactories } = this;

    if (this.container.list.length > 0) {
      this.container.removeAll(true);
    }

    for (let y = 0; y < map.length; y++) {
      const row = map[y];

      for (let x = 0; x < row.length; x++) {
        const col = row[x];

        for (let pipeFactory of pipeFactories) {
          if (pipeFactory.pattern.includes(col)) {
            const pipe = pipeFactory.create(
              scene,
              x * PipesTexture.SIZE,
              y * PipesTexture.SIZE,
              col,
            );

            pipe.enableRotation();
            pipe.addToContainer(container);

            if (onPipeClick) {
              pipe.setOnClickHandler(() => {
                onPipeClick(x, y, pipe.getCurrentVariant());
              });
            }
          }
        }
      }
    }
  }

  getBounds() {
    return this.container.getBounds();
  }

  withContainer(cb: (container: Phaser.GameObjects.Container) => void) {
    cb(this.container);
  }
}

export default MapDrawer;
