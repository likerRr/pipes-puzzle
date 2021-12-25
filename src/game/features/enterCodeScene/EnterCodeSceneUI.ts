import Phaser from 'phaser';

import OrderedGroup from '../../objects/group/OrderedGroup';
import BackMenuButton from '../../objects/menu/BackMenuButton';
import SubmitMenuButton from '../../objects/menu/SubmitMenuButton';

export type InitKeyboardProps = {
  onEnter: (code: string) => void,
  onBack: () => void,
}

export type EnterCodeSceneUIProps = InitKeyboardProps;

class EnterCodeSceneUI {
  private readonly orderedGroup: OrderedGroup;

  private codeText?: Phaser.GameObjects.Text;

  private code: string = '';

  constructor(
    private scene: Phaser.Scene,
  ) {
    this.orderedGroup = new OrderedGroup(scene, 0, 200, {
      padding: 20,
    });
  }

  draw(props: EnterCodeSceneUIProps) {
    this.drawInstructions();
    this.drawCode();
    this.drawSubmitButton(props);
    this.drawBackButton(props);
    this.initKeyboardControls(props);
  }

  handleInvalidCode() {
    this.scene.cameras.main.shake(200, 0.01);
  }

  private drawInstructions() {
    const text = this.scene.add.text(0, 0, 'Type a code:', { font: '24px Arial' });

    this.orderedGroup.add(text);
  }

  private drawCode() {
    const text = this.scene.add.text(0, 0, this.code, { font: '48px Arial', color: 'yellow' });

    this.orderedGroup.add(text);
    this.codeText = text;
  }

  private drawSubmitButton({ onEnter }: InitKeyboardProps) {
    const button = new SubmitMenuButton(this.scene);

    button.setOnClickHandler(() => onEnter(this.code));

    this.orderedGroup.add(button);
  }

  private drawBackButton({ onBack }: InitKeyboardProps) {
    const button = new BackMenuButton(this.scene);

    button.setOnClickHandler(() => this.handleBack({ onBack }));

    this.orderedGroup.add(button);
  }

  private updateTextCode(code: string) {
    this.code = code;

    this.codeText?.setText(this.code);
    this.orderedGroup.updateLayout();
  }

  private initKeyboardControls(props: InitKeyboardProps) {
    this.scene.input.keyboard.on(Phaser.Input.Keyboard.Events.ANY_KEY_DOWN, (e: KeyboardEvent) => {
      const char = e.key;

      if (char.match(/^[a-zA-Z3-6]$/)) {
        this.updateTextCode(this.code + char);
      }

      if (e.keyCode === Phaser.Input.Keyboard.KeyCodes.BACKSPACE) {
        this.updateTextCode(this.code.slice(0, -1));
      }
    });

    const enterKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

    enterKey.on(Phaser.Input.Keyboard.Events.DOWN, () => {
      props.onEnter(this.code);
    });

    const escKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

    escKey.on(Phaser.Input.Keyboard.Events.DOWN, () => this.handleBack(props));
  }

  private handleBack(props: Pick<InitKeyboardProps, 'onBack'>) {
    this.scene.scene.stop();

    props.onBack();
  }
}

export default EnterCodeSceneUI;
