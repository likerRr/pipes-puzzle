import Phaser from 'phaser';

import difficulty from '../../../constants/difficulty';
import { MenuButtonOnClickHandler } from '../../objects/menu/MenuButton';
import SubmitMenuButton from '../../objects/menu/SubmitMenuButton';

export type GameSceneUIProps = {
  level: number,
  sizeV: number,
  sizeH: number,
  onSubmitClick: MenuButtonOnClickHandler,
}

export type MapLegendProps = {
  atX: number,
  atY: number,
  text: string,
}

class GameSceneUI {
  static MAP_LEGEND_MARGIN = 10;

  private horizontalMapLegend!: Phaser.GameObjects.Text;

  private verticalMapLegend!: Phaser.GameObjects.Text;

  constructor(
    private scene: Phaser.Scene,
    private props: GameSceneUIProps,
  ) {
    this.createUI();
  }

  updateHorizontalMapLegend({ text, atX, atY }: MapLegendProps) {
    const { horizontalMapLegend } = this;

    horizontalMapLegend.setText(text);
    horizontalMapLegend.setPosition(
      atX - horizontalMapLegend.width,
      atY - horizontalMapLegend.height - GameSceneUI.MAP_LEGEND_MARGIN,
    );
  }

  updateVerticalMapLegend({ text, atX, atY }: MapLegendProps) {
    const { verticalMapLegend } = this;

    verticalMapLegend.setText(text);
    verticalMapLegend.setPosition(
      atX - verticalMapLegend.width - GameSceneUI.MAP_LEGEND_MARGIN,
      atY - verticalMapLegend.height,
    );
  }

  private createUI() {
    this.createDifficultyLabel();
    this.createSubmitButton();
    this.createMapLegend();
  }

  private createDifficultyLabel() {
    const { level, sizeH, sizeV } = this.props;

    this.scene.add.text(30, 30, `${difficulty[level]} (${sizeH}x${sizeV})`, { font: '32px Arial' });
  }

  private createSubmitButton() {
    const submitButton = new SubmitMenuButton(this.scene, this.scene.cameras.main.height - 100);

    submitButton.setOnClickHandler(this.props.onSubmitClick);
  }

  private createMapLegend() {
    this.horizontalMapLegend = this.scene.add.text(0, 0, '', { font: '24px Arial' });
    this.verticalMapLegend = this.scene.add.text(0, 0, '', { font: '24px Arial' });
  }
}

export default GameSceneUI;
