import { Server } from "socket.io"
import { EVENTS } from "../../domain/events"

export type SendEndSceneFunction = () => void

export const sendEndSceneFactory = (io: Server, room: string): SendEndSceneFunction => {
  return () => {
    io.to(room).emit(EVENTS.game.end)
  }
}
