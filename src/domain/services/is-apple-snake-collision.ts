import { Apple } from '../objects/apple';
import { Snake } from '../objects/snake';

export const isAppleSnakeCollision = (apple: Apple, snake: Snake): Boolean => {
  const { x: headX, y: headY } = snake.getHead();
  return headX === apple.getPosition().x && headY === apple.getPosition().y;
};
