import { EVENTS } from '../../../domain/events';
import { Socket, io } from "socket.io-client";

export class MultiplayerOnlineMenuScene extends Phaser.Scene {
  private createOrJoin: Phaser.GameObjects.BitmapText[] = [];
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
      this.createOrJoin.map((bitmap) => {
        bitmap.setVisible(false)
      })
      this.waiting.setVisible(true)
    })

    this.socket.on(EVENTS.multiplayer.play, () => {
      this.scene.start('MultiplayerOnlineScene', { socket: this.socket });
    })

    this.socket.emit(EVENTS.multiplayer.join_or_create_room);
  }

  preload(): void {
    this.load.bitmapFont(
      'snakeFont',
      './assets/font/snakeFont.png',
      './assets/font/snakeFont.fnt'
    );
  }

  create(): void {
    this.createOrJoin.push(
      this.add.bitmapText(
        this.sys.canvas.width / 2 - 78,
        this.sys.canvas.height / 2,
        'snakeFont',
        'C: CREATE',
        8
      )
    );

    this.createOrJoin.push(
      this.add.bitmapText(
        this.sys.canvas.width / 2 - 78,
        this.sys.canvas.height / 2 + 18,
        'snakeFont',
        'J: JOIN',
        8
      )
    );

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
