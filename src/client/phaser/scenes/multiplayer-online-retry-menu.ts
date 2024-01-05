import { EVENTS } from '../../../domain/events';
import { Socket } from "socket.io-client";
import { CONST } from '../../../domain/const/const';

type Data = { socket: Socket, lastScore: number }

export class MultiplayerOnlineRetryMenuScene extends Phaser.Scene {
  private retryKey: Phaser.Input.Keyboard.Key;
  private quitKey: Phaser.Input.Keyboard.Key;

  private retryOrQuit: Phaser.GameObjects.BitmapText[] = [];
  private waiting: Phaser.GameObjects.BitmapText[] = [];
  private errorText: Phaser.GameObjects.BitmapText;

  private socket: Socket;

  constructor() {
    super({
      key: 'MultiplayerOnlineRetryMenuScene'
    });
  }

  init(data: Data): void {

    this.socket = data.socket;
    this.retryKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.R
    );
    this.quitKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.Q
    );

    this.socket.on(EVENTS.multiplayer.exception, (exception) => {
      console.log("Exception message ", exception.message)
      this.errorText.setText(exception.message);
      setTimeout(() => {
        this.errorText.setText("");
      }, 2000);
    })

    this.socket.on(EVENTS.multiplayer.wait, () => {
      this.retryOrQuit.map((bitmap) => {
        bitmap.setVisible(false)
      })
      this.waiting.map((bitmap) => {
        bitmap.setVisible(true)
      })
    })

    this.socket.on(EVENTS.multiplayer.play, (players: string[]) => {
      this.scene.start('MultiplayerOnlineScene', { socket: this.socket, players: players });
    })

    if (data.lastScore > CONST.HIGHSCORE) {
      CONST.HIGHSCORE = data.lastScore;
    }
  }

  preload(): void {
    this.load.bitmapFont(
      'snakeFont',
      './assets/font/snakeFont.png',
      './assets/font/snakeFont.fnt'
    );
  }

  create(): void {
    this.retryOrQuit.push(
      this.add.bitmapText(
        this.sys.canvas.width / 2 - 78,
        this.sys.canvas.height / 2,
        'snakeFont',
        'R: RETRY',
        8
      )
    );

    this.retryOrQuit.push(
      this.add.bitmapText(
        this.sys.canvas.width / 2 - 78,
        this.sys.canvas.height / 2 + 18,
        'snakeFont',
        'Q: QUIT',
        8
      )
    );

    this.retryOrQuit.push(
      this.add.bitmapText(
        this.sys.canvas.width / 2 - 45,
        this.sys.canvas.height / 2 + 70,
        'snakeFont',
        'HIGHSCORE: ' + CONST.HIGHSCORE,
        8
      )
    );

    this.waiting.push(
      this.add.bitmapText(
        this.sys.canvas.width / 2 - 78,
        this.sys.canvas.height / 2 + 18,
        'snakeFont',
        'WAITING',
        8
      )
    );
    this.waiting.map((bitmap) => {
      bitmap.setVisible(false)
    })

    this.errorText = this.add.bitmapText(
      20,
      this.sys.canvas.height / 2 + 50,
      'snakeFont',
      '',
      7
    )
  }

  update(): void {
    if (this.retryKey.isDown) {
      this.socket.emit(EVENTS.multiplayer.retry_room);
    }
    if (this.quitKey.isDown) {
      this.socket.disconnect()
      this.scene.start('MainMenuScene');
    }
  }
}
