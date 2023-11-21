import { isAppleSnakeCollision } from '../../services/is-apple-snake-collision';
import { isBorderSnakeCollision } from '../../services/is-border-player-collision';
import { isSnakeSelfCollision } from '../../services/is-snake-self-collision';
import { isSnakeSnakeCollision } from '../../services/is-snake-snake-collision';
import { World } from '../../value-objects/world';
import { Snake } from '../snake';

export class SnakeCollision {
  private world: World;
  private addScore: Function;

  constructor(world: World, addScore: Function) {
    this.world = world;
    this.addScore = addScore;
  }

  public update(snake: Snake) {
    // player vs. apple collision
    if (isAppleSnakeCollision(this.world.apple, snake)) {
      snake.grow();
      this.addScore();
      this.world.apple.setRandomPosition();
    }

    if (
      isSnakeSelfCollision(snake.getSnakeBody()) ||
      isBorderSnakeCollision(this.world.gridConfig, snake) ||
      (this.world.otherSnake &&
        isSnakeSnakeCollision(
          snake.getSnakeBody(),
          this.world.otherSnake.getSnakeBody()
        ))
    ) {
      snake.setDead(true);
    }
  }
}
