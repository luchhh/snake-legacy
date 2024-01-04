The good old snake game as a playground to test architecture patterns

To play the game: https://snake-legacy-f87e7f806781.herokuapp.com/

![snake-screenshot](https://github.com/luchhh/snake-legacy/assets/508230/d559fab0-824f-4cad-9896-47e5b9e51c94)

## Roadmap

- :white_check_mark: Local multiplayer
- :white_check_mark: Internet multiplayer
- Internet multiplayer
- Change skin
- Mobile friendly
- Sound effects
- Graphic effects
- Create a Demo IA

## Getting started

### Prerequisites

```
Download and install Node.js @ https://nodejs.org/en
Download and install yarn @ https://classic.yarnpkg.com/en/docs/install
```

### Installing

```
git clone https://github.com/digitsensitive/phaser3-typescript.git
yarn install
```

### Play

```
yarn build
yarn start
```

## Architecture

This is a browser game that uses Phaser3 as a based framework

Apple and Snake are two POTOs handling state of these objects in the game. They are completely agnostic of the Phaser framework.

Then, following the [component architecture](https://gameprogrammingpatterns.com/component.html) described by Robert Nystrom, there are a list of components for each of these objects. The graphic component syncs the objects states with the graphics rendered in Phaser. Input component transforms the user input into new snake state. And finally collisions resolves all the possible collisions and updates the objects' state.

Part of the game state is a grid where the snake can move. If the snake is in the left upper corner of the grid, its position will be [0,0]. If the snakes moves one cell to the right, the new position will be [1,0]. The grid is also completely agnostic of the render context.

Finally, the border is outside of this grid, in this architecture is just a decoration.
