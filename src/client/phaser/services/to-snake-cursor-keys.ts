import { CreateSnakeCursorKeys, SnakeCursorKeys } from '../../../domain/value-objects/snake-cursor-keys';

export const toSnakeCursorKeys = (cursors: Phaser.Types.Input.Keyboard.CursorKeys): SnakeCursorKeys => {
  if (cursors.up.isDown) {
    return CreateSnakeCursorKeys('up');
  } else if (cursors.down.isDown) {
    return CreateSnakeCursorKeys('down');
  } else if (cursors.right.isDown) {
    return CreateSnakeCursorKeys('right');
  } else if (cursors.left.isDown) {
    return CreateSnakeCursorKeys('left');
  } else {
    return CreateSnakeCursorKeys();
  }
};