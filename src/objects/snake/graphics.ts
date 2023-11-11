import { paintNewSnakeFragment } from '../../services/paint-new-snake-fragment';
import { paintSnake } from '../../services/paint-snake';
import { positionToGraphics } from '../../services/position-to-graphics';
import { Snake } from '../snake';

export class SnakeGraphics {
  private snakeBody: Phaser.GameObjects.Graphics[];
  private scene: Phaser.Scene;
  private dotSize: number;

  constructor(scene: Phaser.Scene, dotSize: number) {
    this.scene = scene;
    this.dotSize = dotSize;
  }

  public draw(snake: Snake) {
    this.snakeBody = paintSnake(snake.getSnakeBody(), this.scene, this.dotSize);
  }

  public update(snake: Snake) {
    // sync size if needed
    if (this.snakeBody.length < snake.getLength()) {
      this.snakeBody[this.snakeBody.length] = paintNewSnakeFragment(
        snake.getSnakeBody()[snake.getLength() - 1],
        this.scene,
        this.dotSize
      );
    }

    // sync snakeBody graphics
    snake.getSnakeBody().forEach((i, index) => {
      const graphics = positionToGraphics(i, this.dotSize);
      this.snakeBody[index].x = graphics.x;
      this.snakeBody[index].y = graphics.y;
    });
  }
}
