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

let acc = (arg) => {
  accumulator += arg;
  counter++;
};

let jmp = (arg) => {
  counter += arg;
};

let nop = () => {
  counter++;
};

let reset = () => {
  accumulator = 0;
  counter = 0;
};

let execute = (ops, changeIndex) => {
  let executionMap = {};

  while (counter < ops.length) {
    let lastCounter = counter;
    let [op, arg] = ops[counter];
    let executed = executionMap[counter];

    if (executed) {
      throw new Error("Loop detected");
    }

    let instructionMap =
      lastCounter === changeIndex
        ? instructionMapRepairMode
        : instructionMapNormalMode;

    let executeSingle = instructionMap[op];

    executeSingle(arg);

    executionMap[lastCounter] = true;
  }
};

let instructionMapNormalMode = {
  acc: (arg) => acc(arg),
  jmp: (arg) => jmp(arg),
  nop: (_arg) => nop(),
};

let instructionMapRepairMode = {
  acc: (arg) => acc(arg),
  jmp: (_arg) => nop(),
  nop: (arg) => jmp(arg),
};

let ops = parseInput(contents);

let j = 0;

while (j < ops.length) {
  try {
    execute(ops, j);
  } catch (err) {
    reset();
  }
  j++;
}

console.log(accumulator);
