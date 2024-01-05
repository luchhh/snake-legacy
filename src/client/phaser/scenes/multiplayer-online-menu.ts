import { EVENTS } from '../../../domain/events';
import { Socket, io } from "socket.io-client";

export class MultiplayerOnlineMenuScene extends Phaser.Scene {
  private waiting: Phaser.GameObjects.BitmapText;
  private errorText: Phaser.GameObjects.BitmapText;
  private socket: Socket;

  private waitingTick: number = 0;

  constructor() {
    super({
      key: 'MultiplayerOnlineMenuScene'
    });
  }

  init(): void {
    this.socket = io();

    this.socket.on(EVENTS.multiplayer.exception, (exception) => {
      this.errorText.setText(exception.message);
      setTimeout(() => {
        this.errorText.setText("");
      }, 2000);
    })

    this.socket.on(EVENTS.multiplayer.wait, () => {
      this.waiting.setVisible(true)
    })

    this.socket.on(EVENTS.multiplayer.play, (players: string[]) => {
      this.scene.start('MultiplayerOnlineScene', { socket: this.socket, players: players });
    })
    this.socket.emit(EVENTS.multiplayer.join_or_create_room, sessionStorage.getItem('username'));
  }

  preload(): void {
    this.load.bitmapFont(
      'snakeFont',
      './assets/font/snakeFont.png',
      './assets/font/snakeFont.fnt'
    );
  }

  create(): void {
    this.waiting = this.add.bitmapText(
      this.sys.canvas.width / 2 - 78,
      this.sys.canvas.height / 2 + 18,
      'snakeFont',
      'WAITING',
      8
    );
    this.waiting.setVisible(false)

    this.errorText = this.add.bitmapText(
      20,
      this.sys.canvas.height / 2 + 50,
      'snakeFont',
      '',
      7
    )
  }

  update(time: number): void {
    if (this.waiting.visible && time - this.waitingTick > 500) {
      const newText = this.waiting.text.includes("...") ? 'WAITING' : this.waiting.text + '.'
      this.waiting.setText(newText)
      this.waitingTick = time
    }
  }
}
