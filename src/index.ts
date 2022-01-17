import kaboom from 'kaboom';
import enemy from '/assets/enemy.png';
import wall from '/assets/wall.png';
import block from '/assets/block.png';

kaboom();

loadSprite('enemy', enemy);
loadSprite('wall', wall);
loadSprite('block', block);

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
