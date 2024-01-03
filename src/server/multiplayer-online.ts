import { Apple } from '../domain/objects/apple';
import { Direction, Snake } from '../domain/objects/snake';
import { SnakeCollision } from '../domain/components/collision/snake';
import { GridConfig } from '../domain/value-objects/grid-config';
import { SnakeInput } from '../domain/components/input/snake';
import { CreateSnakeCursorKeys, SnakeCursorKeys } from '../domain/value-objects/snake-cursor-keys';
import { Position } from '../domain/value-objects/position';

type PlayerState = {
  id: string,
  snake: Snake,
  cursors: SnakeCursorKeys
}

export class MultiplayerOnline {
  private score: number;

  private apple: Apple;

  // holds the board size in number of columns and rows starting
  // from position 0,0
  private gridConfig: GridConfig;

  private players: PlayerState[];

  private initialPositions: Position[];
  private initialDirections: Direction[];

  private isGameOver: boolean;

  constructor() {

    //TODO: BIG ONE, don't hardcode this
    this.gridConfig = {
      horizontalSize: 29, //boardWidth / this.dotSize - 1,
      verticalSize: 25 //boardHeight / this.dotSize - 1
    };
    this.apple = new Apple({
      gridConfig: this.gridConfig
    });

    this.initialPositions = [
      { x: 2, y: 2 }
      , {
        x: this.gridConfig.horizontalSize - 2,
        y: this.gridConfig.verticalSize - 2
      },
    ];

    this.initialDirections = [
      'right',
      'left'
    ];
  }

  public create(playersIds: string[]) {
    console.log("creating players", playersIds)
    this.players = []
    this.apple.draw();

    playersIds.forEach((playerId) => {
      this.createPlayer(playerId)
    })

    this.players.forEach(
      ({ id: playerId, snake: player }) => {

        const otherPlayers = this.players
          .flatMap(
            ({ id: itId, snake: itPlayer }) =>
              itId != playerId
                ? itPlayer
                : []
          )

        const worldForPlayer = {
          apple: this.apple,
          gridConfig: this.gridConfig,
          otherSnake: otherPlayers[0]
        };

        player.setCollisionComponent(
          new SnakeCollision(worldForPlayer, this.addScore.bind(this))
        );
      })
    this.isGameOver = false;
    this.score = 0;
  }

  private createPlayer(playerId: string) {
    const cursors = CreateSnakeCursorKeys();
    const playerIndex = this.players.length;
    this.players.push({
      id: playerId,
      cursors: cursors,
      snake: new Snake({
        initialPosition: this.initialPositions[playerIndex],
        initialDirection: this.initialDirections[playerIndex],
        input: new SnakeInput(cursors)
      })
    })
  }

  public update(time: number): void {
    if (this.players.some((p) => p.snake.isDead())) {
      this.isGameOver = true;
    } else {
      this.players.forEach((p) => p.snake.update(time))
      this.apple.update(time);
    }
  }

  public updateCursorKeys(cursors: SnakeCursorKeys, playerId: string) {
    const player = this.players.find((player) => player.id == playerId)
    player.cursors.down.isDown = cursors.down.isDown
    player.cursors.up.isDown = cursors.up.isDown
    player.cursors.left.isDown = cursors.left.isDown
    player.cursors.right.isDown = cursors.right.isDown
  }

  public addScore(): void {
    this.score++;
  }

  public getSnakes(): Snake[] {
    return this.players.map((p) => p.snake);
  }

  public getApple(): Apple {
    return this.apple;
  }

  public getScore(): number {
    return this.score;
  }

  public getIsGameOver(): boolean {
    return this.isGameOver;
  }
}
