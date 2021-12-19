import Phaser from 'phaser';

import { SCENE_GAME, SCENE_MENU } from '../../constants/sceneName';
import OrderedGroup from '../objects/group/OrderedGroup';
import ContinueMenuButton from '../objects/menu/ContinueMenuButton';
import RestartMenuButton from '../objects/menu/RestartMenuButton';
import StartMenuButton from '../objects/menu/StartMenuButton';
import { GamePauseData } from './transition/gameTransitionData';

type MenuSceneData = GamePauseData;

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
      ]);
    } else {
      orderedGroup.add([
        new StartMenuButton(this).setOnClickHandler(() => this.startGame()),
      ]);
    }
  }

  private startGame() {
    this.scene.start(SCENE_GAME);
  }
}

export default MenuScene;
