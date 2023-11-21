import { calculatePlayerDirection } from '../../services/calculate-player-direction';
import { SnakeCursorKeys } from '../../value-objects/snake-cursor-keys';
import { Snake } from '../snake';

export class SnakeInput {
  private cursors: SnakeCursorKeys;

  constructor(cursors: SnakeCursorKeys) {
    this.cursors = cursors;
  }

  public update(snake: Snake) {
    snake.setDirection(calculatePlayerDirection(this.cursors, snake));
  }
}
