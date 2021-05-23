import fs from "fs";

let contents = fs.readFileSync("input.txt", "utf-8");

let parseInput = (contents) => {
  return contents.split(/\n/).map((line) => parseInt(line, 10));
};

let input = parseInput(contents);

let solve = (input) => {
  input.sort((a, b) => a - b);

  let highestJoltage = Math.max(...input);
  let deviceJoltage = highestJoltage + 3;

  let outletJoltage = 0;
  let joltages = [outletJoltage].concat(input).concat(deviceJoltage);

  let i = 1;
  let diffs = [];

  while (i < joltages.length) {
    let diff = joltages[i] - joltages[i - 1];

    diffs.push(diff);
    i++;
  }

  let diffsOfOne = diffs.filter((diff) => diff === 1);
  let diffsOfThree = diffs.filter((diff) => diff === 3);

  return diffsOfOne.length * diffsOfThree.length;
};

let result = solve(input);

console.log(result);
