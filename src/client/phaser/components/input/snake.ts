import { calculatePlayerDirection } from '../../../../domain/services/calculate-player-direction';
import { SnakeCursorKeys } from '../../../../domain/value-objects/snake-cursor-keys';
import { Snake } from '../../../../domain/objects/snake';
import { ISnakeInput } from '../../../../domain/components/interfaces/input/snake';

export class SnakeInput implements ISnakeInput {
  private cursors: SnakeCursorKeys;

  constructor(cursors: SnakeCursorKeys) {
    this.cursors = cursors;
  }

  public update(snake: Snake) {
    snake.setDirection(calculatePlayerDirection(this.cursors, snake));
  }
}
