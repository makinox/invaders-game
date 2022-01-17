import kaboom from 'kaboom';

import spaceShip from '/assets/space-ship.png';
import enemy from '/assets/enemy.png';
import block from '/assets/block.png';
import wall from '/assets/wall.png';

kaboom();

loadSprite('enemy', enemy);
loadSprite('wall', wall);
loadSprite('block', block);
loadSprite('spaceShip', spaceShip);

addLevel(
  [
    '! +++++++++++++++    &',
    '! +++++++++++++++    &',
    '! +++++++++++++++    &',
    '!                    &',
    '!                    &',
    '!                    &',
    '!                    &',
    '!                    &',
    '!                    &',
    '!                    &',
    '!                    &',
  ],
  {
    width: 30,
    height: 22,
    '!': () => [sprite('wall'), scale(0.8)],
    '+': () => [sprite('enemy'), scale(0.5)],
    '&': () => [sprite('block'), scale(0.8)],
  }
);

const player = add([sprite('spaceShip'), pos(width() / 5, height() / 2.8)]);
