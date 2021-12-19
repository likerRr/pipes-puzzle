import Phaser from 'phaser';

const defaultStyle: Phaser.Types.GameObjects.Text.TextStyle = {
  align: 'center',
  font: '32px Arial',
  padding: {
    x: 10,
    y: 10,
  },
  shadow: {
    color: 'yellow',
    fill: true,
  },
};

export interface MenuButtonOnClickHandler {
  (): void,
}

export interface MenuButtonOptions {
  alignHorizontally?: 'center',
  top?: number,
}

class MenuButton extends Phaser.GameObjects.Text {
  constructor(
    scene: Phaser.Scene,
    text: string | string[],
    private options: MenuButtonOptions,
  ) {
    super(scene, 0, 0, text, defaultStyle);

    scene.add.existing(this);

    this.setInteractive({
      useHandCursor: true,
    });
    this.applyOptions();
    this.enableHoverEffect();
  }

  setOnClickHandler(handler: MenuButtonOnClickHandler) {
    this.once(Phaser.Input.Events.POINTER_DOWN, handler);

    this.scene.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      this.off(Phaser.Input.Events.POINTER_DOWN, handler);
    });

    return this;
  }

  private alignHorizontally(): MenuButton {
    const { width } = this.parentContainer ?? this.scene.cameras.main;

    this.setX(width / 2 - this.width / 2);

    return this;
  }

  private applyOptions() {
    if (this.options.alignHorizontally === 'center') {
      this.alignHorizontally();
    }

    if (typeof this.options.top === 'number') {
      this.setY(this.options.top);
    }
  }

  private enableHoverEffect() {
    this.on(Phaser.Input.Events.POINTER_OVER, this.handlePointerOver);
    this.on(Phaser.Input.Events.POINTER_OUT, this.handlePointerOut);

    this.scene.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      this.off(Phaser.Input.Events.POINTER_OVER, this.handlePointerOver);
      this.off(Phaser.Input.Events.POINTER_OUT, this.handlePointerOut);
    });
  }

  private handlePointerOver(): void {
    this.style.setShadowBlur(10);
  }

  private handlePointerOut(): void {
    this.style.setShadowBlur(0);
  }
}

export default MenuButton;
