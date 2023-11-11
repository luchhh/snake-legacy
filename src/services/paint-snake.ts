import { Scene, GameObjects } from 'phaser';
import { Position } from '../value-objects/position';
import { paintNewSnakeFragment } from './paint-new-snake-fragment';

export const paintSnake = (
  snakeBody: Position[],
  scene: Scene,
  dotSize: number
): GameObjects.Graphics[] => {
  return snakeBody.map((fragment, index) => {
    const isHead = index === 0;
    return paintNewSnakeFragment(fragment, scene, dotSize, isHead);
  });
};
