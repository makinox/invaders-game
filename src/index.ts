import kaboom from 'kaboom';

kaboom();

loadSprite('enemy', '/assets/enemy.png');
loadSprite('wall', '/assets/wall.png');
loadSprite('block', '/assets/block.png');

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
