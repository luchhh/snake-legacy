import { SendEndSceneFunction } from "./handlers/end-scene-factory";
import { SendStateFunction } from "./handlers/send-state-factory";
import { MultiplayerOnline } from "./multiplayer-online";

export const gameLoop = async (game: MultiplayerOnline, sendState: SendStateFunction, sendEndScene: SendEndSceneFunction) => {
  console.log('starting loop')
  while (!game.getIsGameOver()) {
    game.update(Date.now())
    sendState(game)
    await new Promise(r => setTimeout(r, 10));
  }
  sendEndScene()
  console.log('ending loop')
}


