import { Apple } from "../../../domain/objects/apple"
import { Snake } from "../../../domain/objects/snake"
import { Position } from "../../../domain/value-objects/position"

// A function that creates a room
type updateStateFunction = (state: any) => void

export const updateStateFactory = (players: Snake[], apple: Apple, setScore: Function): updateStateFunction => {
  return (state: any) => {
    console.log("State update on client", state)
    state.players.forEach((playerBody: Position[], idx: integer) => {
      players[idx].setSnakeBody(playerBody)
    })
    apple.setPosition(state.apple)
    setScore(state.score)
  }
}
