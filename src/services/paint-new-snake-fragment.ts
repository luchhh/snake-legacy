import { Position } from '../value-objects/position';
import { positionToGraphics } from './position-to-graphics';

export const paintNewSnakeFragment = (
  position: Position,
  scene: Phaser.Scene,
  dotSize: number,
  isHead: boolean = false
): Phaser.GameObjects.Graphics => {
  const graphics = positionToGraphics(position, dotSize);

  return scene.add
    .graphics({
      x: graphics.x,
      y: graphics.y,
      fillStyle: { color: 0x61e85b, alpha: isHead ? 1 : 0.8 }
    })
    .fillRect(0, 0, dotSize, dotSize);
};
