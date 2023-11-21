import { Position } from '../value-objects/position';

export const isSnakeSnakeCollision = (
  snakeBody: Position[],
  otherSnakeBody: Position[]
): Boolean => {
  const { x: headX, y: headY } = otherSnakeBody[0];
  return snakeBody.some((fragment) => {
    headX === fragment.x && headY === fragment.y;
  });
};
