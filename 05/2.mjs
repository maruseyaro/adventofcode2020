// @ts-check

export let parseInput = (contents) => {
  let lines = contents.split(/\n/);

  return lines.map(parseLine);
};

let parseLine = (str) => {
  let chars = str.split("");
  let rowChars = chars.slice(0, 7);
  let colChars = chars.slice(7);

  return {
    rowChars,
    colChars,
  };
};

let calculateRow = (chars) => {
  let min = 0;
  let max = 127;

  for (let char of chars) {
    if (char === "B") {
      min = (max + min + 1) / 2;
    } else {
      max = (max + min - 1) / 2;
    }
  }

  return max;
};

let calculateColumn = (chars) => {
  let min = 0;
  let max = 7;

  for (let char of chars) {
    if (char === "R") {
      min = (max + min + 1) / 2;
    } else {
      max = (max + min - 1) / 2;
    }
  }

  return max;
};

let calculateSeatId = (row, col) => {
  return row * 8 + col;
};

export let solve = (input) => {
  const seatIds = input.map((item) => {
    let row = calculateRow(item.rowChars);
    let col = calculateColumn(item.colChars);

    return calculateSeatId(row, col);
  });

  seatIds.sort((a, b) => a - b);

  let i = 1;

  while (i < seatIds.length) {
    let current = seatIds[i];
    let after = seatIds[i + 1];

    if (current + 1 !== after) {
      return current + 1;
    }

    i++;
  }

  return -1;
};
