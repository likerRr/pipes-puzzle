import Phaser from 'phaser';

class Container {
  static alignInCamera(
    container: Phaser.GameObjects.Container,
    camera: Phaser.Cameras.Scene2D.Camera,
    position: 'center' | 'x' | 'y' = 'center',
  ) {
    const bounds = container.getBounds();

    if (position === 'center' || position === 'x') {
      container.setX(camera.centerX - bounds.width / 2);
    }

    if (position === 'center' || position === 'y') {
      container.setY(camera.centerY - bounds.height / 2);
    }
  }
}

export default Container;
