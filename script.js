const colors = ["yellow", "red"];
const gameGrid = document.getElementById("game-grid");
const grid = new Array(7)
  .fill(0)
  .map((_, x) =>
    new Array(6).fill(0).map((_, y) => ({ class: "token", x, y }))
  );
function dropToken(position) {
  if (!grid[position].every((token) => token.class.includes("token token"))) {
    const lastFilled = grid[position].findIndex((token) =>
      token.class.includes("token token")
    );
    if (lastFilled !== -1) {
      grid[position][lastFilled - 1].class = `token token-${colors[0]}`;
    } else {
      grid[position][
        grid[position].length - 1
      ].class = `token token-${colors[0]}`;
    }
    render();
    checkWinCon(position, lastFilled !== -1 ? lastFilled - 1 : 5);
    colors.reverse();
  }
}
function checkWinCon(position, lastFilled) {
  for (let i = 0; i < 3; i++) {
    if (
      grid[position]
        .slice(0 + i, 4 + i)
        .every((token) => token.class.includes(`token-${colors[0]}`))
    ) {
      document.body.removeEventListener("click", handleClick);
      console.log(`${colors[0]} won!`);
    }
  }
  for (let j = 0; j < 4; j++) {
    if (
      [
        grid[j][lastFilled],
        grid[j + 1][lastFilled],
        grid[j + 2][lastFilled],
        grid[j + 3][lastFilled],
      ].every((token) => token.class.includes(`token-${colors[0]}`))
    ) {
      document.body.removeEventListener("click", handleClick);
      console.log(`${colors[0]} won!`);
    }
  }
}
function handleClick(e) {
  if (e.target.dataset.col) {
    dropToken(e.target.dataset.col);
  }
}
document.body.addEventListener("click", handleClick);
function render() {
  gameGrid.innerHTML = grid
    .map((arr) =>
      arr
        .map(
          (col) =>
            `<div class="${col.class}" data-x=${col.x} data-y=${col.y}></div>`
        )
        .join("")
    )
    .map((arr, i) => `<div class="column" data-col=${i}>${arr}</div>`)
    .join("");
}
render();
