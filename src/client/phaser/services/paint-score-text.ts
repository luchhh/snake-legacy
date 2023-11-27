import { Scene, GameObjects } from 'phaser';
import { Position } from '../../../domain/value-objects/position';

export const paintScoreText = (
  scene: Scene,
  score: number,
  gameWidth: number
): GameObjects.BitmapText => {
  return scene.add.bitmapText(gameWidth / 2, 1, 'snakeFont', '' + score, 8);
};
