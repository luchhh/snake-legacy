import { Position } from '../value-objects/position';
import { SnakeCollision } from './snake/collision';
import { SnakeGraphics as SnakeGraphics } from './snake/graphics';
import { SnakeInput } from './snake/input';

export type Direction = 'up' | 'down' | 'right' | 'left';

export class Snake {
  private direction: Direction;
  private dead: boolean;
  private snakeBody: Position[];
  private graphics: SnakeGraphics;
  private input: SnakeInput;
  private collision: SnakeCollision;
  private tick: number;

  constructor(
    graphics: SnakeGraphics,
    input: SnakeInput,
    collision: SnakeCollision
  ) {
    this.tick = 0;
    this.graphics = graphics;
    this.input = input;
    this.collision = collision;

    this.direction = 'right';
    this.dead = false;
    this.snakeBody = [{ x: 2, y: 2 }];
  }

  //public state

  public isDead(): boolean {
    return this.dead;
  }
  public setDead(_dead: boolean): void {
    this.dead = _dead;
  }
  public getSnakeBody(): Position[] {
    return this.snakeBody;
  }

  public grow(): void {
    // FIXME: hacky thingy here, for one cycle we say that
    // the new tail has the same position than the previous tail
    // this fails in collision detection
    this.snakeBody[this.snakeBody.length] = {
      x: this.snakeBody[this.snakeBody.length - 1].x,
      y: this.snakeBody[this.snakeBody.length - 1].y
    };
  }
  public getHead(): Position {
    return this.snakeBody[0];
  }
  public getLength(): number {
    return this.snakeBody.length;
  }
  public getDirection() {
    return this.direction;
  }
  public setDirection(direction: Direction) {
    this.direction = direction;
  }

  public draw() {
    this.graphics.draw(this);
  }

  public update(time: number) {
    if (this.tick === 0) {
      this.tick = time;
    }

    if (time - this.tick > 100) {
      this.move();
      this.collision.update(this);
      this.graphics.update(this);
      this.tick = time;
      this.input.update(this);
    }
  }

  //private

  private move() {
    // move rest of body
    for (let i = this.getLength() - 1; i > 0; i--) {
      this.snakeBody[i].x = this.snakeBody[i - 1].x;
      this.snakeBody[i].y = this.snakeBody[i - 1].y;
    }

    // move head
    if (this.getDirection() === 'left') {
      this.snakeBody[0].x--;
    } else if (this.getDirection() === 'right') {
      this.snakeBody[0].x++;
    } else if (this.getDirection() === 'up') {
      this.snakeBody[0].y--;
    } else if (this.getDirection() === 'down') {
      this.snakeBody[0].y++;
    }
  }
}
