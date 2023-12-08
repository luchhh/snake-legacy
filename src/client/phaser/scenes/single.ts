import { Apple } from '../../../domain/objects/apple';
import { Snake } from '../../../domain/objects/snake';
import { CONST } from '../../../domain/const/const';
import { SnakeGraphics } from '../components/graphics/snake';
import { SnakeInput } from '../../../domain/components/input/snake';
import { SnakeCollision } from '../../../domain/components/collision/snake';
import { AppleGraphics } from '../components/graphics/apple';
import { paintBorders } from '../services/paint-borders';
import { paintScoreText } from '../services/paint-score-text';
import { World } from '../../../domain/value-objects/world';
import { GridConfig } from '../../../domain/value-objects/grid-config';
import { SnakeCursorKeys } from '../../../domain/value-objects/snake-cursor-keys';

export class SingleScene extends Phaser.Scene {
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
  private cursors: SnakeCursorKeys;

  constructor() {
    super({
      key: 'SingleScene'
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
      { x: 2, y: 2 },
      'right',
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
