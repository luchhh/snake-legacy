import { BootScene } from './scenes/boot-scene';
import { SingleScene } from './scenes/single';
import { MainMenuScene } from './scenes/main-menu-scene';
import { MultiplayerLocalScene } from './scenes/multiplayer-local';
import { MultiplayerOnlineScene } from './scenes/multiplayer-online';
import { MultiplayerOnlineMenuScene } from './scenes/multiplayer-online-menu';
import { MultiplayerOnlineRetryMenuScene } from './scenes/multiplayer-online-retry-menu';

export const GameConfig: Phaser.Types.Core.GameConfig = {
  title: 'Snake Legacy',
  url: 'https://github.com/digitsensitive/phaser3-typescript',
  version: '1.0',
  width: 256,
  height: 224,
  zoom: 3,
  type: Phaser.AUTO,
  parent: 'game',
  scene: [BootScene, MainMenuScene, SingleScene, MultiplayerLocalScene, MultiplayerOnlineMenuScene, MultiplayerOnlineRetryMenuScene, MultiplayerOnlineScene],
  input: {
    keyboard: true,
    mouse: false,
    touch: false,
    gamepad: false
  },
  backgroundColor: '#000000',
  render: { pixelArt: true, antialias: false },
  dom: {
    createContainer: true
  },
};
