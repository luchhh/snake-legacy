import { Direction } from '../objects/snake';
import { Position } from '../value-objects/position';

export const calculateNewBody = (snakeBody: Position[], direction: Direction): Position[] => {
  return snakeBody.map(
    (position, index, body) => {
      if (index == 0) {
        // new head value
        if (direction === 'left') {
          return { x: position.x - 1, y: position.y };
        } else if (direction === 'right') {
          return { x: position.x + 1, y: position.y };
        } else if (direction === 'up') {
          return { x: position.x, y: position.y - 1 };
        } else if (direction === 'down') {
          return { x: position.x, y: position.y + 1 };
        }
      } else {
        // new other part of the body
        const previousPosition = body[index - 1]
        return { x: previousPosition.x, y: previousPosition.y };
      }
    }
  )
}