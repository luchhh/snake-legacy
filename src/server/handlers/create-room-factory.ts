import { Server } from "socket.io"
import { GameStore } from "../stores/game-store"
import { MultiplayerOnline } from "../multiplayer-online"
import { registerInputHandler } from "./input-handler"
import { EVENTS } from "../../domain/events"

// A function that creates a room
type CreateRoomFunction = (roomName: string, username: string) => void

export const createRoomFactory = (io: Server, socket: any, gameStore: GameStore): CreateRoomFunction => {
  return (room: string, username: string) => {
    if (!roomExists(io, room)) {
      socket.join(room)
      createGame(room, socket, gameStore, username)
      socket.emit(EVENTS.multiplayer.wait)
      console.log("created room", room)
    } else {
      handleRoomAlreadyCreated(io, socket, room)
    }
  }
}

const roomExists = (io: Server, room: string) => {
  return io.sockets.adapter.rooms.get(room) != null
}

const createGame = (room: string, socket: any, gameStore: GameStore, username: string) => {
  const game = new MultiplayerOnline()
  gameStore.registerGame(room, game)
  gameStore.registerPlayer(room, username)
  registerInputHandler(socket, game)
}

const handleRoomAlreadyCreated = (io: Server, socket: any, room: string) => {
  if (socket.rooms.has(room)) {
    // user already joined in this room, just ignore this request
  } else {
    console.log('exception: cant create, room', room, ' already exists')
    socket.emit(EVENTS.multiplayer.exception, { message: 'Room already exists' });
  }
}