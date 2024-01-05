import { MultiplayerOnline } from "../multiplayer-online";
import { GameStore } from "./game-store";

type GameState = {
  game: MultiplayerOnline,
  isFinished: boolean,
  players: string[]
}

export class InMemoryGameStore implements GameStore {

  private states: Map<string, GameState>

  constructor() {
    this.states = new Map<string, GameState>();
  }

  setIsFinished(room: string): void {
    this.states.set(room, { ...this.findOrCreate(room), isFinished: true });
  }

  findIsFinishedByRoom(room: string): boolean {
    return this.states.get(room).isFinished;
  }

  registerGame(room: string, game: MultiplayerOnline) {
    this.states.set(room, { ...this.findOrCreate(room), game: game });
  }

  findGameByRoom(room: string): MultiplayerOnline {
    return this.states.get(room).game;
  }

  registerPlayer(room: string, player: string): void {
    const state = this.findOrCreate(room)
    this.states.set(room, { ...state, players: state.players.concat(player) });
  }

  findPlayersByRoom(room: string): string[] {
    return this.states.get(room).players;
  }

  private findOrCreate(room: string): GameState {
    return this.states.get(room) || { game: null, isFinished: false, players: [] }
  }
}
