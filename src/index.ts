import kaboom, { Vec2 } from 'kaboom';

import { DeviceType, getDeviceType } from '@makinox/makinox-utils';
import { ButtonContained } from '@makinox/makinox-ui';

import './styles/colors.css';
import './styles/styles.css';
import '../node_modules/@makinox/makinox-ui/dist/index.css';

import spaceShip from '/assets/space-ship.png';
import enemy from '/assets/enemy.png';
import block from '/assets/block.png';
import wall from '/assets/wall.png';
import lose from './scenes/lose';
import Navbar from './layout/Navbar/Navbar';
import Helmet from './layout/Helmet/Helmet';
import win from './scenes/win';

Helmet();

kaboom({
  width: 900,
  height: 400,
  font: 'sinko',
  canvas: document.querySelector('#invaders-canvas'),
  background: [0, 0, 0],
});
lose();
win();

loadSprite('enemy', enemy);
loadSprite('wall', wall);
loadSprite('block', block);
loadSprite('spaceShip', spaceShip);

const MOVE_SPEED = 200;
const BULLET_SPEED = 400;
const ENEMY_SPEED = 100;
let CURRENT_SPEED = 100;
const LEVEL_DOWN = 50;
const TIME_LEFT = 30;

layer('obj');
layer('ui');

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

const player = add([sprite('spaceShip'), pos(width() / 3, height() / 1.5), area(), 'player']);

function moveLeft() {
  player.move(-MOVE_SPEED, 0);
}

function moveRight() {
  player.move(MOVE_SPEED, 0);
}

keyDown('left', () => {
  moveLeft();
});
keyDown('a', () => {
  moveLeft();
});

keyDown('right', () => {
  moveRight();
});
keyDown('d', () => {
  moveRight();
});

function spawnBullet(p: Vec2) {
  add([rect(6, 18), pos(p), color(255, 255, 255), area(), 'bullet']);
}

keyPress('space', () => {
  spawnBullet(player.pos.add(29, -25));
});

action('bullet', (bullet) => {
  bullet.move(0, -BULLET_SPEED);
  if (bullet.pos.y < 0) {
    destroy(bullet);
  }
});

const score = add([
  text('0'),
  pos(830, 50),
  layer('ui'),
  scale(2),
  {
    value: 0,
  },
]);

add([text('Score:'), pos(685, 50), scale(2), layer('ui')]);

const timer = add([
  text('0'),
  pos(810, 100),
  scale(2),
  layer('ui'),
  {
    time: TIME_LEFT,
  },
]);
add([text('Time:'), pos(685, 100), scale(2), layer('ui')]);

timer.onUpdate(() => {
  timer.time -= dt();
  timer.text = timer.time.toFixed(1).toString();

  if (timer.time <= 0) {
    timer.text = '0000';
    go('lose', score.value);
  }

  if (score.value >= 45) {
    go('win', score.value);
  }
});

action('enemy', (enemy) => {
  enemy.move(CURRENT_SPEED, 0);
});

onCollide('enemy', 'right-wall', () => {
  CURRENT_SPEED = -ENEMY_SPEED;
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

onCollide('enemy', 'player', () => {
  go('lose', score.value);
});

onCollide('bullet', 'enemy', (bullet, enemy) => {
  destroy(bullet);
  destroy(enemy);
  shake(4);
  if (score.value > 0 && score.value < 2) {
    document.querySelector('#info')?.remove();
  }
  const actualScore = score.value + 1;
  score.value = actualScore;
  score.text = actualScore.toString();
});

action('enemy', (enemy) => {
  if (enemy.pos.y >= 12 * 22) {
    go('lose', score.value);
  }
});

function controls() {
  const controlSing = [
    { id: 'left', class: 'fas fa-arrow-left' },
    { id: 'right', class: 'fas fa-arrow-right' },
    { id: 'fire', class: 'fa-solid fa-fire' },
  ];
  const controlContainer = document.querySelector('.section-controls');
  controlSing.forEach((item) => {
    let leftTimer: NodeJS.Timeout = null;
    let rightTimer: NodeJS.Timeout = null;
    const coverElement = document.createElement('span');
    const iconElement = document.createElement('i');
    iconElement.className = item.class;
    coverElement.appendChild(iconElement);
    coverElement.onmousedown = () => {
      switch (item.id) {
        case 'left':
          leftTimer = setInterval(() => moveLeft(), 10);
          break;
        case 'right':
          rightTimer = setInterval(() => moveRight(), 10);
          break;
        case 'fire':
          return spawnBullet(player.pos.add(29, -25));
      }
    };
    coverElement.onmouseup = () => {
      switch (item.id) {
        case 'left':
          return clearInterval(leftTimer);
        case 'right':
          return clearInterval(rightTimer);
      }
    };
    coverElement.className = `${ButtonContained()}`;
    coverElement.style.margin = '10px';
    controlContainer.appendChild(coverElement);
  });
}

Navbar();

if (getDeviceType() !== DeviceType.Desktop) {
  document.querySelector('#info')?.remove();
  controls();
}
