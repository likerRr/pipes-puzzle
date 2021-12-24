import Phaser from 'phaser';

import Fireworks from '../../objects/fireworks/Fireworks';

class EndGameUI {
  container!: Phaser.GameObjects.Container;

  fireworks: Fireworks;

  onOverlayClick: CallableFunction;

  overlay!: Phaser.GameObjects.Rectangle;

  scene: Phaser.Scene;

  text!: Phaser.GameObjects.Text;

  constructor(scene: Phaser.Scene, onOverlayClick: CallableFunction) {
    this.scene = scene;
    this.fireworks = new Fireworks(scene);
    this.onOverlayClick = onOverlayClick;

    this.createUI();
  }

  private static getText(password: string = ''): string {
    return `Congratulations! The password is "${password}"\n\nCLICK to continue`;
  }

  show(text: string) {
    this.updateText(text);

    this.container.once(Phaser.Input.Events.POINTER_DOWN, this.onOverlayClick);

    this.scene.tweens.add({
      targets: this.container,
      alpha: 1,
      ease: 'Power2',
      duration: 500,
    });

    this.fireworks.show(this.scene.scale.width / 2, this.scene.scale.height / 2);
  }

  private createUI() {
    this.createContainer();
    this.createOverlay();
    this.createText();
  }

  private createContainer() {
    this.container = this.scene.add.container(0, 0)
      .setAlpha(0)
      .setInteractive(
        new Phaser.Geom.Rectangle(0,0, this.scene.cameras.main.width, this.scene.cameras.main.height),
        Phaser.Geom.Rectangle.Contains,
      )
      .setDepth(2);
  }

  private createOverlay() {
    const overlay = this.scene.add.rectangle(
      0,
      0,
      this.scene.cameras.main.width,
      this.scene.cameras.main.height,
      Phaser.Display.Color.RGBStringToColor('rgb(53, 181, 22)').color,
    );

    overlay.setOrigin(0, 0).setAlpha(.7);

    this.container.add(overlay);
    this.overlay = overlay;
  }

  private createText() {
    const text = this.scene.add.text(0, 0, '', { align: 'center', font: '32px Arial' });

    this.container.add(text);
    this.text = text;

    this.updateText(EndGameUI.getText());
  }

  private updateText(text: string) {
    this.text.setText(EndGameUI.getText(text));

    Phaser.Display.Align.In.Center(this.text, this.overlay);
  }
}

export default EndGameUI;
