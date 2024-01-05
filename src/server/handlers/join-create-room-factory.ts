import { Server } from "socket.io"
import { GameStore } from "../stores/game-store"
import { joinRoomFactory } from "./join-room-factory"
import { createRoomFactory } from "./create-room-factory"

const ROOM_LIMIT_SIZE = 2;

// A function that creates a room
type joinOrCreateRoomFunction = (roomName: string) => void

export const joinOrCreateRoomFactory = (io: Server, socket: any, gameStore: GameStore): joinOrCreateRoomFunction => {
  const joinRoom = joinRoomFactory(io, socket, gameStore)
  const createRoom = createRoomFactory(io, socket, gameStore)
  return (username: string) => {
    if (socket.rooms > 0) {
      // user already in a room, just ignore this request
      return
    }

    const joined = Array.from(io.sockets.adapter.rooms).some(([room, participants]) => {
      if (participants.size < ROOM_LIMIT_SIZE) {
        joinRoom(room, username);
        return true;
      }
    });

    if (!joined) {
      createRoom(socket.id, username)
    }
  }
}