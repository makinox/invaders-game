export default function win() {
  return scene('win', (args) => {
    add([text(`you win: ${args}`), scale(2), pos(width() / 2.5, height() / 2)]);

    setTimeout(() => {
      if (window.confirm('Play again?')) {
        window.location.reload();
      }
    }, 1000);
  });
}
