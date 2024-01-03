import http from 'http'
import path from 'path'
import express, { Request, Response, Application } from 'express';
import appRoot from 'app-root-path'
import { Server } from 'socket.io'
import { EVENTS } from '../domain/events';
import { GameStore } from './stores/game-store';
import { InMemoryGameStore } from './stores/in-memory-game-store';
import { createRoomFactory } from './handlers/create-room-factory';
import { joinRoomFactory } from './handlers/join-room-factory';
import { retryRoomFactory } from './handlers/retry-room-factory';
import { joinOrCreateRoomFactory } from './handlers/join-create-room-factory';

const app: Application = express();
const server = http.createServer(app);
const io = new Server(server);
const gameStore: GameStore = new InMemoryGameStore()

app.use(express.static(path.join(appRoot.path, 'dist')));

app.get('/', (req: Request, res: Response) => {
  res.sendFile(path.join(appRoot.path, 'dist/index.html'));
});

const port = process.env.PORT == null || process.env.PORT == "" ? 3001 : process.env.PORT;

server.listen(port, () => {
  console.log('Running at http://localhost:' + port);
});

io.on(EVENTS.connection, (socket) => {

  // leaving all rooms of this socket
  socket.rooms.forEach((room: any) => {
    socket.leave(room)
  })
  socket.on(EVENTS.multiplayer.join_or_create_room, joinOrCreateRoomFactory(io, socket, gameStore))
  socket.on(EVENTS.multiplayer.create_room, createRoomFactory(io, socket, gameStore))
  socket.on(EVENTS.multiplayer.join_room, joinRoomFactory(io, socket, gameStore))
  socket.on(EVENTS.multiplayer.retry_room, retryRoomFactory(io, socket, gameStore))
  socket.on(EVENTS.disconnect, (reason: string) => {
    console.log("Disconnected ", socket.id, " because ", reason)
  })
});
