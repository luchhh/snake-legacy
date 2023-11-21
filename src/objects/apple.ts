import { GridConfig } from '../value-objects/grid-config';
import { Position } from '../value-objects/position';
import { AppleGraphics } from './apple/graphics';

export class Apple {
  private graphics: AppleGraphics;
  private position: Position;
  private gridConfig: GridConfig;

  constructor(graphics: AppleGraphics, gridConfig: GridConfig) {
    this.graphics = graphics;
    this.gridConfig = gridConfig;
  }

  public getPosition(): Position {
    return this.position;
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
    this.graphics.draw(this);
  }

  public update(time: number) {
    this.graphics.update(this);
  }

  private rndXPos(): number {
    return Phaser.Math.RND.between(0, this.gridConfig.horizontalSize);
  }

  private rndYPos(): number {
    return Phaser.Math.RND.between(0, this.gridConfig.verticalSize);
  }
}
