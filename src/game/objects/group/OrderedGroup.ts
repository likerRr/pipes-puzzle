import Phaser from 'phaser';

import Container from '../../../lib/phaser/Container';

type OrderedGroupConfig = {
  direction?: 'vertical' | 'horizontal',
  padding?: number,
};

const defaultConfig: OrderedGroupConfig = {
  direction: 'vertical',
  padding: 0,
};

class OrderedGroup {
  private readonly container: Phaser.GameObjects.Container;

  constructor(
    private scene: Phaser.Scene,
    x: number,
    y: number,
    private config: OrderedGroupConfig = defaultConfig,
  ) {
    this.config = {
      ...defaultConfig,
      ...config,
    }
    this.container = scene.add.container(x, y);

    this.updateLayout();
  }

  add<T extends Phaser.GameObjects.Text>(object: T | Array<T>) {
    const objects: Array<T> = Array.isArray(object) ? object : [object];

    objects.forEach(gameObject => this.push(gameObject));

    this.updateLayout();
  }

  updateLayout() {
    Container.alignInCamera(this.container, this.scene.cameras.main, 'x');

    if (this.config.direction === 'vertical') {
      this.alignItemsHorizontally();
    }
  }

  alignItemsHorizontally() {
    const bounds = this.container.getBounds();

    this.container.iterate((gameObject: Phaser.GameObjects.Text) => {
      gameObject.setX(bounds.width / 2 - gameObject.width / 2);
    });
  }

  private push<T extends Phaser.GameObjects.Text>(gameObject: T) {
    if (this.config.direction === 'vertical') {
      gameObject.setY(this.getNextItemY());
    }

    if (this.config.direction === 'horizontal') {
      gameObject.setX(this.getNextItemX());
    }

    this.container.add(gameObject);
  }

  private getNextItemY(): number {
    const rect = this.container.getBounds();
    const padding = rect.height === 0 ? 0 : this.config.padding as number;

    return rect.height + padding;
  }

  private getNextItemX(): number {
    const rect = this.container.getBounds();
    const padding = rect.width === 0 ? 0 : this.config.padding as number;

    return rect.width + padding;
  }
}

export default OrderedGroup;
