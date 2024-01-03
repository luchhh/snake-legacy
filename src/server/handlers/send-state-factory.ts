import { Server } from "socket.io"
import { MultiplayerOnline } from "../multiplayer-online"
import { EVENTS } from "../../domain/events"

export type SendStateFunction = (game: MultiplayerOnline) => void

export const sendSateFactory = (io: Server, room: string): SendStateFunction => {
  return (game: MultiplayerOnline) => {
    const state = {
      players: game.getSnakes().map((s) => s.getSnakeBody()),
      apple: game.getApple().getPosition(),
      score: game.getScore()
    }
    io.to(room).emit(EVENTS.game.state_update, state)
  }
}