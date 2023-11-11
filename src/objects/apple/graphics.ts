import { paintApple } from '../../services/paint-apple';
import { positionToGraphics } from '../../services/position-to-graphics';
import { Apple } from '../apple';

export class AppleGraphics {
  private apple: Phaser.GameObjects.Graphics;
  private dotSize: number;
  private scene: Phaser.Scene;

  constructor(scene: Phaser.Scene, dotSize: number) {
    this.scene = scene;
    this.dotSize = dotSize;
  }

  public draw(apple: Apple) {
    this.apple = paintApple(apple, this.scene, this.dotSize);
  }

  public update(apple: Apple) {
    // sync apple Graphic
    const graphics = positionToGraphics(apple.getPosition(), this.dotSize);

    this.apple.x = graphics.x;
    this.apple.y = graphics.y;
  }
}
