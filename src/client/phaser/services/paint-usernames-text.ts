import { Scene, GameObjects } from 'phaser';

export const paintUsernamesText = (
  scene: Scene,
  players: string[],
  gameHeight: number,
  dotSize: number
): GameObjects.BitmapText => {
  return scene.add.bitmapText(dotSize, gameHeight - dotSize, 'snakeFont', players.join(" and "), 8);
};
