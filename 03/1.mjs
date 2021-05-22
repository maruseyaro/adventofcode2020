export function solve(input) {
  let slopes = [[3, 1]];

  return slopes
    .map((slope) => countTrees(input, slope))
    .reduce((a, b) => a * b, 1);
}

function countTrees(input, slope) {
  let rows = input.length;
  let cols = input[0].length;

  let i = 0;
  let currentPosition = [0, 0];

  let treeCount = 0;

  let [dx, dy] = slope;

  while (i < rows - dy) {
    let newPosition = [currentPosition[0] + dx, currentPosition[1] + dy];

    let [x, y] = newPosition;
    let el = input[y][x % cols];

    if (el === "#") {
      treeCount++;
    }

    currentPosition = newPosition;
    i += dy;
  }

  return treeCount;
}
