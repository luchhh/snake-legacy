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

export class MultiplayerLocalScene extends Phaser.Scene {
  // field and game setting

  private gameHeight: number;
  private gameWidth: number;
  private dotSize: number;
  private score: number;

  // objects
  private playerOne: Snake;
  private playerTwo: Snake;
  private apple: Apple;
  private worldForPlayerOne: World;
  private worldForPlayerTwo: World;

  // holds the board size in number of columns and rows starting
  // from position 0,0
  private gridConfig: GridConfig;

  // texts
  private scoreText: Phaser.GameObjects.BitmapText;

  // cursor
  private playerOneCursors: SnakeCursorKeys;
  private playerTwoCursors: SnakeCursorKeys;

  constructor() {
    super({
      key: 'MultiplayerLocalScene'
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
    this.playerOneCursors = this.input.keyboard.createCursorKeys();
    this.playerTwoCursors = <SnakeCursorKeys>this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D
    });
    this.score = 0;
  }

  create(): void {
    // decoration
    paintBorders(this, this.dotSize, this.gameWidth, this.gameHeight);
    this.scoreText = paintScoreText(this, this.score, this.gameWidth);

    // objects
    this.apple = new Apple({
      gridConfig: this.gridConfig,
      graphics: new AppleGraphics(this, this.dotSize)
    });
    this.apple.draw();

    this.playerOne = new Snake({
      initialPosition: { x: 2, y: 2 },
      initialDirection: 'right',
      graphics: new SnakeGraphics(this, this.dotSize),
      input: new SnakeInput(this.playerOneCursors)
    });

    this.playerTwo = new Snake({
      initialPosition: {
        x: this.gridConfig.horizontalSize - 2,
        y: this.gridConfig.verticalSize - 2
      },
      initialDirection: 'left',
      graphics: new SnakeGraphics(this, this.dotSize),
      input: new SnakeInput(this.playerTwoCursors)
    });

    this.worldForPlayerOne = {
      apple: this.apple,
      gridConfig: this.gridConfig,
      otherSnake: this.playerTwo
    };

    this.worldForPlayerTwo = {
      apple: this.apple,
      gridConfig: this.gridConfig,
      otherSnake: this.playerOne
    };

    this.playerOne.setCollisionComponent(
      new SnakeCollision(this.worldForPlayerOne, this.addScore.bind(this))
    );
    this.playerTwo.setCollisionComponent(
      new SnakeCollision(this.worldForPlayerTwo, this.addScore.bind(this))
    );

    this.playerOne.draw();
    this.playerTwo.draw();
  }

  update(time: number): void {
    if (!this.playerOne.isDead() && !this.playerTwo.isDead()) {
      this.playerOne.update(time);
      this.playerTwo.update(time);
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
