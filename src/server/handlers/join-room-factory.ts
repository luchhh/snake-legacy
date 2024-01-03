import { Server } from "socket.io"
import { GameStore } from "../stores/game-store"
import { EVENTS } from "../../domain/events"
import { sendEndSceneFactory } from "./end-scene-factory"
import { sendSateFactory } from "./send-state-factory"
import { registerInputHandler } from "./input-handler"
import { gameLoop } from "../game-loop"
import { MultiplayerOnline } from "../multiplayer-online"

const ROOM_LIMIT_SIZE = 2;

// A function that joins a socket to a room
type JoinRoomFunction = (roomName: string) => void

export const joinRoomFactory = (io: Server, socket: any, gameStore: GameStore): JoinRoomFunction => {

  return async (roomName: string) => {
    const room = io.sockets.adapter.rooms.get(roomName)

    if (room && room.size < ROOM_LIMIT_SIZE) {
      console.log('joined room', roomName)
      socket.join(roomName)
      io.to(roomName).emit(EVENTS.multiplayer.play)

      const game = gameStore.findGameByRoom(roomName)
      registerInputHandler(socket, game)
      initGame(game, io, roomName)
    } else {
      handleError(io, socket, roomName)
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

const handleError = (io: Server, socket: any, roomName: string) => {
  const room = io.sockets.adapter.rooms.get(roomName)
  if (socket.rooms.has(roomName)) {
    // user already joined in this room, just ignore this request
    return
  }

  if (!room) {
    console.log('exception: room', roomName, ' does not exists')
    socket.emit(EVENTS.multiplayer.exception, { message: 'Room does not exists' });
    return
  }

  if (room.size >= ROOM_LIMIT_SIZE) {
    console.log('exception: room', roomName, ' is full')
    socket.emit(EVENTS.multiplayer.exception, { message: 'Room is full' });
  }
}