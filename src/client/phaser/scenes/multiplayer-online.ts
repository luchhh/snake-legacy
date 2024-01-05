import { Apple } from '../../../domain/objects/apple';
import { Snake } from '../../../domain/objects/snake';
import { CONST } from '../../../domain/const/const';
import { SnakeGraphics } from '../components/graphics/snake';
import { AppleGraphics } from '../components/graphics/apple';
import { paintBorders } from '../services/paint-borders';
import { paintScoreText } from '../services/paint-score-text';
import { GridConfig } from '../../../domain/value-objects/grid-config';
import { Socket } from "socket.io-client";
import { EVENTS } from '../../../domain/events';
import { updateStateFactory } from '../handlers/update-state-factory';
import { EmitToSocket } from '../components/input/emit-to-socket';
import { paintUsernamesText } from '../services/paint-usernames-text';

type Data = { socket: Socket, players: string[] }

export class MultiplayerOnlineScene extends Phaser.Scene {
  // field and game setting
  private gameHeight: number;
  private gameWidth: number;
  private dotSize: number;
  private score: number;

  // objects
  private players: Snake[];
  private apple: Apple;

  // holds the board size in number of columns and rows starting
  // from position 0,0
  private gridConfig: GridConfig;

  // texts
  private scoreText: Phaser.GameObjects.BitmapText;
  private playersText: Phaser.GameObjects.BitmapText;

  // cursor
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  private tick: number;
  private socket: Socket;
  private endScene: boolean;

  private playersUsername: string[];

  constructor() {
    super({
      key: 'MultiplayerOnlineScene'
    });
  }

  init(data: Data): void {
    this.dotSize = CONST.FIELD_SIZE;
    this.gameHeight = this.sys.canvas.height;
    this.gameWidth = this.sys.canvas.width;
    const boardWidth = this.gameWidth - 2 * this.dotSize;
    const boardHeight = this.gameHeight - 2 * this.dotSize;
    this.gridConfig = {
      horizontalSize: boardWidth / this.dotSize - 1,
      verticalSize: boardHeight / this.dotSize - 1
    };
    this.cursors = this.input.keyboard.createCursorKeys();
    this.score = 0;
    this.tick = 0;
    this.socket = data.socket;
    this.endScene = false;
    this.playersUsername = data.players;
  }

  create(): void {
    // decoration
    paintBorders(this, this.dotSize, this.gameWidth, this.gameHeight);
    this.scoreText = paintScoreText(this, this.score, this.gameWidth);
    this.playersText = paintUsernamesText(this, this.playersUsername, this.gameHeight, this.dotSize);

    // objects
    this.apple = new Apple({
      gridConfig: this.gridConfig,
      graphics: new AppleGraphics(this, this.dotSize)
    });
    this.apple.draw();

    this.players = [
      this.createSnake({ self: true }),
      this.createSnake()
    ]
    this.players.forEach(it => { it.draw() });

    this.socket.on(EVENTS.game.state_update, updateStateFactory(this.players, this.apple, this.setScore.bind(this)));
    this.socket.on(EVENTS.game.end, () => { this.endScene = true })
  }

  update(time: number): void {
    if (this.tick === 0) {
      this.tick = time;
    }

    if (time - this.tick > 10) {
      if (!this.endScene) {
        this.players.forEach((it) => it.update(time));
        this.apple.update(time);
      } else {
        this.scene.start('MultiplayerOnlineRetryMenuScene', { lastScore: this.score, socket: this.socket });
      }
      this.tick = time;
    }
  }

  setScore(score: number): void {
    this.score = score;
    this.scoreText.setText('' + score);
  }

  private createSnake = ({ self } = { self: false }): Snake => {
    return new Snake({
      initialPosition: { x: 0, y: 0 },
      initialDirection: 'right',
      graphics: new SnakeGraphics(this, this.dotSize),
      input: self ? new EmitToSocket(this.cursors, this.socket) : undefined
    })
  }
}

