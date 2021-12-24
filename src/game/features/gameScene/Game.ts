import Phaser from 'phaser';

import { SCENE_MENU } from '../../../constants/sceneName';

class Game {
  static MIN_LEVEL = 1;

  static LAST_LEVEL = 6;

  static STARTING_LEVEL = Game.MIN_LEVEL;

  static getNextLevel(currentLevel: number) {
    return Phaser.Math.Clamp(currentLevel + 1, Game.MIN_LEVEL, Game.LAST_LEVEL);
  }

  static restartScenesToMenu(scene: Phaser.Scene) {
    scene.game.scene.scenes.forEach(thisScene => thisScene.scene.stop());
    scene.scene.start(SCENE_MENU, {});
  }
}

export default Game;
