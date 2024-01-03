import { ISnakeInput } from "../../../../domain/components/interfaces/input/snake";
import { EVENTS } from "../../../../domain/events";
import { Snake } from "../../../../domain/objects/snake";
import { toSnakeCursorKeys } from "../../services/to-snake-cursor-keys";

export class EmitToSocket implements ISnakeInput {
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  private socket: any;

  constructor(cursors: Phaser.Types.Input.Keyboard.CursorKeys, socket: any) {
    this.cursors = cursors;
    this.socket = socket;
  }

  public update(snake: Snake) {
    const cursors = toSnakeCursorKeys(this.cursors)
    const anyKey = cursors.up.isDown || cursors.right.isDown || cursors.down.isDown || cursors.left.isDown

    // Don't emit if there are no keys down
    if (anyKey) {
      this.socket.emit(EVENTS.game.input_update, cursors);
    }
  }
}
