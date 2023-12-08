import { GridConfig } from '../value-objects/grid-config';
import { Position } from '../value-objects/position';
import { IAppleGraphics } from '../components/interfaces/graphics/apple';

type Options = {
  gridConfig: GridConfig,
  graphics?: IAppleGraphics
}

export class Apple {
  private graphics: IAppleGraphics;
  private position: Position;
  private gridConfig?: GridConfig;

  constructor(options: Options) {
    this.graphics = options.graphics;
    this.gridConfig = options.gridConfig;
  }

  public getPosition(): Position {
    return this.position;
  }

  public setPosition(position: Position) {
    this.position = position;
  }

  /**
   * Randomly generate new apple position on the field
   */
  public setRandomPosition(): void {
    this.position = {
      x: this.rndXPos(),
      y: this.rndYPos()
    };
  }

  public draw() {
    this.setRandomPosition();
    this.graphics?.draw(this);
  }

  public update(time: number) {
    this.graphics?.update(this);
  }

  private rndXPos(): number {
    return Math.floor(Math.random() * this.gridConfig.horizontalSize);
  }

  private rndYPos(): number {
    return Math.floor(Math.random() * this.gridConfig.verticalSize);
  }
}
