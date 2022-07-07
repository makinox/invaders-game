import Reset from '../layout/Reset/Reset';

export default function win() {
  return scene('win', (args) => {
    add([text(`you win: ${args}`), scale(2), pos(width() / 2.5, height() / 2)]);

    Reset();
  });
}
