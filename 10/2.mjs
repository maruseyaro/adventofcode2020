import fs from "fs";

let contents = fs.readFileSync("input.txt", "utf-8");

let parseInput = (contents) => {
  return contents.split(/\n/).map((line) => parseInt(line, 10));
};

let cache = {};

let countDistinctArrangements = (xs, i) => {
  if (cache[i]) {
    return cache[i];
  }

  if (i === xs.length - 1) {
    return 1;
  }

  let total = 0;
  let nextIndices = getNextPossibleAdapterIndices(xs, i);

  nextIndices.forEach((j) => (total += countDistinctArrangements(xs, j)));

  cache[i] = total;

  return total;
};

let getNextPossibleAdapterIndices = (xs, i) => {
  let nextIndex = i + 1;
  let nextIndices = [];
  let curr = xs[i];

  for (let j = nextIndex; j <= nextIndex + 3; j++) {
    let next = xs[j];

    if (next - curr <= 3) {
      nextIndices.push(j);
    } else {
      break;
    }
  }

  return nextIndices;
};

let input = parseInput(contents);

let solve = (input) => {
  input.sort((a, b) => a - b);

  let highestJoltage = Math.max(...input);
  let deviceJoltage = highestJoltage + 3;

  let outletJoltage = 0;
  let joltages = [outletJoltage].concat(input).concat(deviceJoltage);

  return countDistinctArrangements(joltages, 0);
};

let result = solve(input);

console.log(result);
