import { CONST } from '../const/const';

type Data = { lastScore: number };

export class MainMenuScene extends Phaser.Scene {
  private singleKey: Phaser.Input.Keyboard.Key;
  private multiplayerLocalKey: Phaser.Input.Keyboard.Key;
  private bitmapTexts: Phaser.GameObjects.BitmapText[] = [];

  constructor() {
    super({
      key: 'MainMenuScene'
    });
  }

  init(data: Data): void {
    this.singleKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.S
    );
    this.multiplayerLocalKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.L
    );

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
    this.bitmapTexts.push(
      this.add.bitmapText(
        this.sys.canvas.width / 2 - 35,
        this.sys.canvas.height / 2,
        'snakeFont',
        'S: SINGLE',
        8
      )
    );

    this.bitmapTexts.push(
      this.add.bitmapText(
        this.sys.canvas.width / 2 - 78,
        this.sys.canvas.height / 2 + 18,
        'snakeFont',
        'L: LOCAL MULTIPLAYER',
        8
      )
    );

    this.bitmapTexts.push(
      this.add.bitmapText(
        this.sys.canvas.width / 2 - 70,
        this.sys.canvas.height / 2 - 80,
        'snakeFont',
        'S N A K E',
        16
      )
    );

    this.bitmapTexts.push(
      this.add.bitmapText(
        this.sys.canvas.width / 2 - 85,
        this.sys.canvas.height / 2 - 55,
        'snakeFont',
        'L E G A C Y',
        16
      )
    );

    this.bitmapTexts.push(
      this.add.bitmapText(
        this.sys.canvas.width / 2 - 45,
        this.sys.canvas.height / 2 + 50,
        'snakeFont',
        'HIGHSCORE: ' + CONST.HIGHSCORE,
        8
      )
    );
  }

  update(): void {
    if (this.singleKey.isDown) {
      this.scene.start('SingleScene');
    }
    if (this.multiplayerLocalKey.isDown) {
      this.scene.start('MultiplayerLocalScene');
    }
  }
}
