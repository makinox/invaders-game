import kaboom from 'kaboom';

import spaceShip from '/assets/space-ship.png';
import enemy from '/assets/enemy.png';
import block from '/assets/block.png';
import wall from '/assets/wall.png';
import lose from './scenes/lose';

kaboom();
lose();

loadSprite('enemy', enemy);
loadSprite('wall', wall);
loadSprite('block', block);
loadSprite('spaceShip', spaceShip);

const MOVE_SPEED = 200;
const ENEMY_SPEED = 100;
let CURRENT_SPEED = 100;
const LEVEL_DOWN = 50;
const TIME_LEFT = 2;

layer('obj');
layer('ui');

// const enemies = add([sprite('enemy'), scale(0.5), 'enemy']);

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
    '!': () => [sprite('wall'), scale(0.8), area(), 'left-wall'],
    '+': () => [sprite('enemy'), scale(0.5), area(), 'enemy'],
    '&': () => [sprite('block'), scale(0.8), area(), 'right-wall'],
  }
);

const player = add([sprite('spaceShip'), pos(width() / 5, height() / 2.8)]);
keyDown('left', () => {
  player.move(-MOVE_SPEED, 0);
});

keyDown('right', () => {
  player.move(MOVE_SPEED, 0);
});

const score = add([
  text('0'),
  pos(50, 50),
  layer('ui'),
  // scale(3),
  {
    value: 0,
  },
]);

const timer = add([
  text('0'),
  pos(190, 90),
  // scale(3),
  layer('ui'),
  {
    time: TIME_LEFT,
  },
]);

timer.onUpdate(() => {
  timer.time -= dt();
  timer.text = timer.time.toFixed(2).toString();

  if (timer.time <= 0) {
    timer.text = '0000';
    // go('lose', 100);
  }
});

action('enemy', (enemy) => {
  enemy.move(CURRENT_SPEED, 0);
});

onCollide('enemy', 'right-wall', () => {
  CURRENT_SPEED = -ENEMY_SPEED;
  console.log('ee');
  every('enemy', (enemy) => {
    enemy.move(0, LEVEL_DOWN);
  });
});

onCollide('enemy', 'left-wall', () => {
  CURRENT_SPEED = ENEMY_SPEED;
  every('enemy', (enemy) => {
    enemy.move(0, LEVEL_DOWN);
  });
});
