export const EVENTS = {
  disconnect: 'disconnect',
  connection: 'connection',
  multiplayer: {
    create_room: 'multiplayer-create-room',
    join_room: 'multiplayer-join-room',
    join_or_create_room: 'multiplayer-create-join-room',
    retry_room: 'multiplayer-retry-room',
    wait: 'multiplayer-wait',
    exception: 'multiplayer-exception',
    play: 'multiplayer-play',
  },
  game: {
    start: 'game-start',
    state_update: 'game-state-update',
    end: 'game-end',
    input_update: 'game-input-update'
  }
}