import Phaser from 'phaser';

class PhaserGame {
  constructor(
    private config: Phaser.Types.Core.GameConfig
  ) {}

  start(container: HTMLElement, scenes: Array<new () => Phaser.Scene> = []): Phaser.Game {
    return new Phaser.Game({
      ...this.config,
      parent: container,
      scene: scenes,
    });
  }
}

export default PhaserGame;
