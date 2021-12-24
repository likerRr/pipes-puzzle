import Phaser from 'phaser';

class Container {
  static alignInCameraCenter(container: Phaser.GameObjects.Container, camera: Phaser.Cameras.Scene2D.Camera) {
    const bounds = container.getBounds();

    container.setPosition(
      camera.centerX - bounds.width / 2,
      camera.centerY - bounds.height / 2,
    );
  }
}

export default Container;
