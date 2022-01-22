export default function lose() {
  return scene('lose', (args) => {
    add([text(`You loose: ${args}`), scale(2), pos(width() / 2.5, height() / 2)]);
    // const continue = window.confirm('Play again?')
    // if (continue) {
    //   window.location.reload()
    // }
  });
}
