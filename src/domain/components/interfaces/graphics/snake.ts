import { Snake } from "../../../objects/snake"

export interface ISnakeGraphics {
  draw(snake: Snake): void
  update(snake: Snake): void
}
