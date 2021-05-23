import fs from "fs";

let contents = fs.readFileSync("./08/input.txt", "utf-8");

let parseInput = (contents) => {
  return contents.split(/\n/).map((line) => {
    let [op, arg] = line.split(" ");
    return [op, parseInt(arg, 10)];
  });
};

let accumulator = 0;
let counter = 0;

let execute = (ops) => {
  let executionMap = {};

  while (true) {
    let lastCounter = counter;
    let [op, arg] = ops[counter];
    let executed = executionMap[counter];

    if (executed) {
      break;
    }

    if (op === "acc") {
      accumulator += arg;
      counter++;
    }

    if (op === "jmp") {
      counter += arg;
    }

    if (op === "nop") {
      counter++;
    }

    executionMap[lastCounter] = true;
  }
};

let input = parseInput(contents);

console.log(parseInput(contents));

execute(input);

console.log(accumulator);
