import { Server } from "socket.io"
import { GameStore } from "../stores/game-store"
import { EVENTS } from "../../domain/events"
import { sendEndSceneFactory } from "./end-scene-factory"
import { sendSateFactory } from "./send-state-factory"
import { gameLoop } from "../game-loop"
import { MultiplayerOnline } from "../multiplayer-online"

const ROOM_LIMIT_SIZE = 2;

// A function that joins a socket to a room
type RetryRoomFunction = (roomName: string) => void

export const retryRoomFactory = (io: Server, socket: any, gameStore: GameStore): RetryRoomFunction => {

  return async () => {
    const roomName = socket.rooms.values().next().value
    const room = io.sockets.adapter.rooms.get(roomName)

    if (room && room.size == ROOM_LIMIT_SIZE) {
      console.log('retrying room', roomName)
      const game = gameStore.findGameByRoom(roomName)
      if (game.getIsGameOver()) {
        io.to(roomName).emit(EVENTS.multiplayer.play, gameStore.findPlayersByRoom(roomName))
        initGame(game, io, roomName)
      }
    } else {
      handleError(socket)
    }
  }
}


const initGame = async (game: MultiplayerOnline, io: Server, room: string) => {
  const idsInRoom = (await io.in(room).fetchSockets()).map((socket) => socket.id);
  game.create(idsInRoom)
  const sendEndScene = sendEndSceneFactory(io, room)
  const sendState = sendSateFactory(io, room)
  gameLoop(game, sendState, sendEndScene)
}

const handleError = (socket: any) => {
  console.log('exception: room not available')
  socket.emit(EVENTS.multiplayer.exception, { message: 'Room not available anymore' });
}