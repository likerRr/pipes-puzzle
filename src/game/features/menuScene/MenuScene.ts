import Phaser from 'phaser';

import { SCENE_ENTER_CODE, SCENE_MENU } from '../../../constants/sceneName';
import EnterCodeSceneCreateData from '../enterCodeScene/EnterCodeSceneCreateData';
import Game from '../game/Game';
import GameService from '../game/GameService';
import WsClientRegistry from '../registry/WsClientRegistry';
import OrderedGroup from '../../objects/group/OrderedGroup';
import ContinueMenuButton from '../../objects/menu/ContinueMenuButton';
import ControlsDescription from '../../objects/menu/ControlsDescription';
import EnterCodeMenuButton from '../../objects/menu/EnterCodeMenuButton';
import QuitMenuButton from '../../objects/menu/QuitMenuButton';
import RestartMenuButton from '../../objects/menu/RestartMenuButton';
import StartMenuButton from '../../objects/menu/StartMenuButton';
import MenuSceneCreateData from './MenuSceneCreateData';

class MenuScene extends Phaser.Scene {
  constructor() {
    super(SCENE_MENU);
  }

  create(data: MenuSceneCreateData) {
    const orderedGroup = new OrderedGroup(this, 0, 200, {
      padding: 20,
    });

    if (data.isPause) {
      orderedGroup.add([
        new ContinueMenuButton(this).setOnClickHandler(() => data.resume()),
        new RestartMenuButton(this).setOnClickHandler(() => data.restart()),
        new QuitMenuButton(this).setOnClickHandler(() => Game.restartScenesToMenu(this)),
        new ControlsDescription(this),
      ]);

      this.addCloseMenuEvent(() => data.resume());
    } else {
      if (data.wasted) {
        const text = this.scene.scene.add.text(0, 0, 'Too many attempts. You lose!', { align: 'center', font: '48px Arial', color: 'red' });

        this.tweens.add({
          alpha: 0,
          ease: Phaser.Math.Easing.Cubic.Out,
          duration: 3000,
          targets: text,
        });

        orderedGroup.add(text);
      }

      const wsClient = WsClientRegistry.getWsClient(this.registry);
      const gameService = new GameService(this, wsClient);
      const enterCodeData: EnterCodeSceneCreateData = {
        goBack: () => {
          this.scene.start();
        }
      };

      orderedGroup.add([
        new StartMenuButton(this).setOnClickHandler(() => gameService.startNewGame(Game.STARTING_LEVEL)),
        new EnterCodeMenuButton(this).setOnClickHandler(() => this.scene.start(SCENE_ENTER_CODE, enterCodeData)),
        new ControlsDescription(this),
      ]);
    }
  }

  private addCloseMenuEvent(onClose: CallableFunction) {
    const escKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

    escKey.on(Phaser.Input.Keyboard.Events.DOWN, onClose);
  }
}

export default MenuScene;
