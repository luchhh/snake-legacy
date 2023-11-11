import { calculatePlayerDirection } from '../../services/calculate-player-direction';
import { Snake } from '../snake';

export class SnakeInput {
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys;

  constructor(cursors: Phaser.Types.Input.Keyboard.CursorKeys) {
    this.cursors = cursors;
  }

  public update(snake: Snake) {
    snake.setDirection(calculatePlayerDirection(this.cursors, snake));
  }
}
