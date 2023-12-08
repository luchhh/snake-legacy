import { calculatePlayerDirection } from '../../services/calculate-player-direction';
import { SnakeCursorKeys } from '../../value-objects/snake-cursor-keys';
import { Snake } from '../../objects/snake';
import { ISnakeInput } from '../interfaces/input/snake';

export class SnakeInput implements ISnakeInput {
  private cursors: SnakeCursorKeys;

  constructor(cursors: SnakeCursorKeys) {
    this.cursors = cursors;
  }

  public update(snake: Snake) {
    snake.setDirection(calculatePlayerDirection(this.cursors, snake));
  }
}
