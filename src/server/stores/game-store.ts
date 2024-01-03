import { MultiplayerOnline } from "../multiplayer-online";

export interface GameStore {
  registerGame(room: string, game: MultiplayerOnline): void
  findGameByRoom(room: string): MultiplayerOnline
  setIsFinished(room: string): void
  findIsFinishedByRoom(room: string): boolean
}