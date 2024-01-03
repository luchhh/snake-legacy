import { MultiplayerOnline } from "../multiplayer-online";
import { GameStore } from "./game-store";

type GameState = {
  game: MultiplayerOnline,
  isFinished: boolean
}

export class InMemoryGameStore implements GameStore {

  private states: Map<string, GameState>

  constructor() {
    this.states = new Map<string, GameState>();
  }

  setIsFinished(room: string): void {
    this.states.get(room).isFinished = true;
  }

  findIsFinishedByRoom(room: string): boolean {
    return this.states.get(room).isFinished;
  }

  registerGame(room: string, game: MultiplayerOnline) {
    this.states.set(room, { game, isFinished: false });
  }

  findGameByRoom(room: string): MultiplayerOnline {
    return this.states.get(room).game;
  }


}
