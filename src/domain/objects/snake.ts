import { Position } from '../value-objects/position';
import { SnakeCollision } from '../components/collision/snake';
import { ISnakeGraphics } from '../components/interfaces/graphics/snake';
import { ISnakeInput } from '../components/interfaces/input/snake';

export type Direction = 'up' | 'down' | 'right' | 'left';

type Options = {
  initialPosition: Position,
  initialDirection: Direction,
  graphics?: ISnakeGraphics,
  input?: ISnakeInput,
  collision?: SnakeCollision
}

export class Snake {
  private direction: Direction;
  private dead: boolean;
  private snakeBody: Position[];
  private graphics: ISnakeGraphics;
  private input: ISnakeInput;
  private collision: SnakeCollision;
  private tick: number;

  constructor(
    options: Options
  ) {
    this.tick = 0;
    this.graphics = options.graphics;
    this.input = options.input;
    this.collision = options.collision;

    this.direction = options.initialDirection;
    this.dead = false;
    this.snakeBody = [options.initialPosition];
  }

  //public state

  public isDead(): boolean {
    return this.dead;
  }
  public setDead(dead: boolean): void {
    this.dead = dead;
  }
  public getSnakeBody(): Position[] {
    return this.snakeBody;
  }
  public setSnakeBody(snakeBody: Position[]): void {
    this.snakeBody = snakeBody
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
  public setCollisionComponent(collision: SnakeCollision) {
    this.collision = collision;
  }

  public draw() {
    this.graphics?.draw(this);
  }

  public update(time: number) {
    if (this.tick === 0) {
      this.tick = time;
    }

    if (time - this.tick > 100) {
      this.move();
      this.collision?.update(this);
      this.graphics?.update(this);
      this.tick = time;
    }
    this.input?.update(this);
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
