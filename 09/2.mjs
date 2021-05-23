import fs from "fs";

let contents = fs.readFileSync("./09/input.txt", "utf-8");

let parseInput = (contents) => {
  let lines = contents.split(/\n/).map((n) => parseInt(n, 10));

  return lines;
};

let input = parseInput(contents);

let findInvalidNumber = (input) => {
  let preambleSize = 25;
  let i = preambleSize;

  while (i < input.length) {
    let start = i - preambleSize;
    let end = i;
    let prevs = input.slice(start, end);
    let curr = input[i];

    if (!isSumOf(curr, prevs)) {
      return input[i];
    }

    i++;
  }

  return -1;
};

let isSumOf = (sum, xs) => {
  for (let i = 0; i < xs.length - 1; i++) {
    for (let j = i; j < xs.length; j++) {
      if (sum === xs[i] + xs[j]) {
        return true;
      }
    }
  }

  return false;
};

let findRangeOfSumOfInvalidNumber = (invalid, input) => {
  for (let i = 0; i < input.length; i++) {
    let sum = input[i];
    let j = i + 1;

    while (sum <= invalid) {
      if (sum === invalid) {
        return [i, j];
      }

      sum += input[j];
      j++;
    }
  }

  return -1;
};

let solve = (input) => {
  let invalid = findInvalidNumber(input);
  let [start, end] = findRangeOfSumOfInvalidNumber(invalid, input);
  let xs = input.slice(start, end);
  let min = Math.min(...xs);
  let max = Math.max(...xs);

  return min + max;
};

console.log(solve(input));
