import { Scene } from 'phaser';

export const paintBorders = (
  scene: Scene,
  dotSize: number,
  gameWidth: number,
  gameHeight: number
) => {
  //top bar
  scene.add
    .graphics({
      x: 0,
      y: 0,
      fillStyle: { color: 0x61e85b, alpha: 0.3 }
    })
    .fillRect(dotSize, 0, gameWidth - dotSize, dotSize);

  //left bar
  scene.add
    .graphics({
      x: 0,
      y: 0,
      fillStyle: { color: 0x61e85b, alpha: 0.3 }
    })
    .fillRect(0, 0, dotSize, gameHeight - dotSize);

  //right bar
  scene.add
    .graphics({
      x: gameWidth,
      y: dotSize,
      fillStyle: { color: 0x61e85b, alpha: 0.3 }
    })
    .fillRect(0, 0, -dotSize, gameHeight - dotSize);

  //bottom bar
  scene.add
    .graphics({
      x: 0,
      y: gameHeight,
      fillStyle: { color: 0x61e85b, alpha: 0.3 }
    })
    .fillRect(0, 0, gameWidth - dotSize, -dotSize);
};
