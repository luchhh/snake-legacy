import { Position } from '../../../domain/value-objects/position';

export const positionToGraphics = (position: Position, dotSize: number) => {
  const initialBorder = dotSize;
  return {
    x: position.x * dotSize + initialBorder,
    y: position.y * dotSize + initialBorder
  };
};
