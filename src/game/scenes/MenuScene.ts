import Phaser from 'phaser';

import { SCENE_MENU } from '../../constants/sceneName';
import Game from '../features/gameScene/Game';
import startNewGame from '../features/gameScene/startNewGame';
import OrderedGroup from '../objects/group/OrderedGroup';
import ContinueMenuButton from '../objects/menu/ContinueMenuButton';
import QuitMenuButton from '../objects/menu/QuitMenuButton';
import RestartMenuButton from '../objects/menu/RestartMenuButton';
import StartMenuButton from '../objects/menu/StartMenuButton';
import { GamePauseData } from './transition/gameTransitionData';

type MenuSceneData = GamePauseData;

type GameResumable = Pick<MenuSceneData, "resume">;

class MenuScene extends Phaser.Scene {
  constructor() {
    super(SCENE_MENU);
  }

  create(data: MenuSceneData) {
    const orderedGroup = new OrderedGroup(this, 0, 200, {
      padding: 20,
    });

    if (data.isPause) {
      orderedGroup.add([
        new ContinueMenuButton(this).setOnClickHandler(() => data.resume()),
        new RestartMenuButton(this).setOnClickHandler(() => data.restart()),
        new QuitMenuButton(this).setOnClickHandler(() => Game.restartScenesToMenu(this)),
      ]);
    } else {
      orderedGroup.add([
        new StartMenuButton(this).setOnClickHandler(() => startNewGame(this, Game.STARTING_LEVEL)),
      ]);
    }

    this.addCloseMenuEvent(data);
  }

  private addCloseMenuEvent(data: GameResumable) {
    const escKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

    escKey.on(Phaser.Input.Keyboard.Events.DOWN, () => data.resume());
  }
}

export default MenuScene;
