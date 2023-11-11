import { Direction, Snake } from '../objects/snake';

export const calculatePlayerDirection = (
  cursors: Phaser.Types.Input.Keyboard.CursorKeys,
  snake: Snake
): Direction => {
  const currentDirection = snake.getDirection();
  if (cursors.up.isDown && currentDirection != 'down') {
    return 'up';
  } else if (cursors.down.isDown && currentDirection != 'up') {
    return 'down';
  } else if (cursors.right.isDown && currentDirection != 'left') {
    return 'right';
  } else if (cursors.left.isDown && currentDirection != 'right') {
    return 'left';
  } else {
    return currentDirection;
  }
};
