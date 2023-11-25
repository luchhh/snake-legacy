import { Apple } from '../../../domain/objects/apple';
import { positionToGraphics } from './position-to-graphics';

export const paintApple = (
  apple: Apple,
  scene: Phaser.Scene,
  dotSize: number
): Phaser.GameObjects.Graphics => {
  const graphics = positionToGraphics(apple.getPosition(), dotSize);
  return scene.add
    .graphics({
      x: graphics.x,
      y: graphics.y,
      fillStyle: { color: 0x61e85b, alpha: 0.8 }
    })
    .fillRect(0, 0, dotSize, dotSize);
};
