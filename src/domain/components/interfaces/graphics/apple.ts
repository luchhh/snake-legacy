import { Apple } from "../../../objects/apple"

export interface IAppleGraphics {
  draw(snake: Apple): void
  update(snake: Apple): void
}
