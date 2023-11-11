import { Snake } from '../objects/snake';
import { GridConfig } from '../scenes/game-scene';

export const isBorderSnakeCollision = (
  gridConfig: GridConfig,
  snake: Snake
): Boolean => {
  const { x: headX, y: headY } = snake.getHead();
  if (headX > gridConfig.horizontalSize || headX < 0) {
    return true;
  }
  if (headY > gridConfig.verticalSize || headY < 0) {
    return true;
  }
  return false;
};
