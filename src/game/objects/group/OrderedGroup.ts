import Phaser from 'phaser';

type OrderedGroupConfig = {
  padding: number,
};

const defaultConfig = {
  padding: 0,
};

class OrderedGroup {
  private container: Phaser.GameObjects.Container;

  constructor(
    private scene: Phaser.Scene,
    x: number,
    y: number,
    private config: OrderedGroupConfig = defaultConfig
  ) {
    this.container = scene.add.container(x, y);
  }

  add<T extends Phaser.GameObjects.Text>(object: T | Array<T>) {
    const objects: Array<T> = Array.isArray(object) ? object : [object];

    objects.forEach(gameObject => this.push(gameObject));
  }

  private push<T extends Phaser.GameObjects.Text>(gameObject: T) {
    gameObject.setY(this.getNextItemY());

    this.container.add(gameObject);
  }

  private getNextItemY(): number {
    const rect = this.container.getBounds();
    const padding = rect.height === 0 ? 0 : this.config.padding;

    return rect.height + padding;
  }
}

export default OrderedGroup;
