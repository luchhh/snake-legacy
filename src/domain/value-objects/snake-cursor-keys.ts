import { Direction } from "../objects/snake";

export type SnakeCursorKeys = {
  up: Key;
  down: Key;
  left: Key;
  right: Key;
};

type Key = {
  isDown: Boolean
}

export const CreateSnakeCursorKeys = (direction?: Direction): SnakeCursorKeys => {
  switch (direction) {
    case 'up': {
      return { up: { isDown: true }, down: { isDown: false }, left: { isDown: false }, right: { isDown: false } }
    }
    case 'down': {
      return { up: { isDown: false }, down: { isDown: true }, left: { isDown: false }, right: { isDown: false } }
    }
    case 'left': {
      return { up: { isDown: false }, down: { isDown: false }, left: { isDown: true }, right: { isDown: false } }
    }
    case 'right': {
      return { up: { isDown: false }, down: { isDown: false }, left: { isDown: false }, right: { isDown: true } }
    }
    default: {
      return { up: { isDown: false }, down: { isDown: false }, left: { isDown: false }, right: { isDown: false } }
    }
  }
}