import { EVENTS } from "../../../domain/events";
import { toSnakeCursorKeys } from "../services/to-snake-cursor-keys";

const emitInputUpdate = (phaserCursors: Phaser.Types.Input.Keyboard.CursorKeys, socket: any) => {
  console.log("Emitting input update")
  const cursors = toSnakeCursorKeys(phaserCursors)
  const anyKey = cursors.up.isDown || cursors.right.isDown || cursors.down.isDown || cursors.left.isDown
  if (anyKey) {
    socket.emit(EVENTS.game.input_update, cursors);
  }
}