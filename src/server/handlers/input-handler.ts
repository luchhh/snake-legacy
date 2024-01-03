import { EVENTS } from "../../domain/events"
import { SnakeCursorKeys } from "../../domain/value-objects/snake-cursor-keys"
import { MultiplayerOnline } from "../multiplayer-online"

export const registerInputHandler = (socket: any, game: MultiplayerOnline) => {
  socket.on(EVENTS.game.input_update, (cursors: SnakeCursorKeys) => {
    game.updateCursorKeys(cursors, socket.id)
  })
}