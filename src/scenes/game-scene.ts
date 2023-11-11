import { Apple } from '../objects/apple';
import { Snake } from '../objects/snake';
import { CONST } from '../const/const';
import { SnakeGraphics } from '../objects/snake/graphics';
import { SnakeInput } from '../objects/snake/input';
import { SnakeCollision } from '../objects/snake/collision';
import { AppleGraphics } from '../objects/apple/graphics';
import { paintBorders } from '../services/paint-borders';
import { paintScoreText } from '../services/paint-score-text';

export type World = { apple: Apple; gridConfig: GridConfig };
export type GridConfig = { horizontalSize: number; verticalSize: number };

export class GameScene extends Phaser.Scene {
  // field and game setting

  private gameHeight: number;
  private gameWidth: number;
  private dotSize: number;
  private score: number;

  // objects
  private player: Snake;
  private apple: Apple;
  private world: World;

  // holds the board size in number of columns and rows starting
  // from position 0,0
  private gridConfig: GridConfig;

  // texts
  private scoreText: Phaser.GameObjects.BitmapText;

  // cursor
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys;

  constructor() {
    super({
      key: 'GameScene'
    });
  }

  init(): void {
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
  }

  create(): void {
    // decoration
    paintBorders(this, this.dotSize, this.gameWidth, this.gameHeight);
    this.scoreText = paintScoreText(this, this.score, this.gameWidth);

    // objects
    this.apple = new Apple(
      new AppleGraphics(this, this.dotSize),
      this.gridConfig
    );
    this.apple.draw();

    this.world = {
      apple: this.apple,
      gridConfig: this.gridConfig
    };

    this.player = new Snake(
      new SnakeGraphics(this, this.dotSize),
      new SnakeInput(this.cursors),
      new SnakeCollision(this.world, this.addScore.bind(this))
    );
    this.player.draw();
  }

  update(time: number): void {
    if (!this.player.isDead()) {
      this.player.update(time);
      this.apple.update(time);
    } else {
      this.scene.start('MainMenuScene', { lastScore: this.score });
    }
  }

  addScore(): void {
    this.score++;
    this.scoreText.setText('' + this.score);
  }
}
