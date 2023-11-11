import { Position } from '../value-objects/position';

export const isSnakeSelfCollision = (snakeBody: Position[]): Boolean => {
  for (let i = snakeBody.length - 1; i > 0; i--) {
    if (
      snakeBody.length > 2 &&
      snakeBody[0].x === snakeBody[i].x &&
      snakeBody[0].y === snakeBody[i].y
    ) {
      return true;
    }
  }
  return false;
};
