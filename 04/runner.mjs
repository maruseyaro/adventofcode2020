import { readFileSync } from "fs";
import { solve } from "./2.mjs";

let fileContents = readFileSync("./04/input.txt", "utf-8");

let parseFileContents = (contents) => {
  let lines = contents.split(/\n\n/);
  let pairs = lines.map((line) =>
    line
      .split(/\n/)
      .flatMap((line) => line.split(" ").map((str) => str.split(":")))
  );

  return pairs.map(Object.fromEntries);
};

let input = parseFileContents(fileContents);

console.log(input);

let solution = solve(input);

console.log(solution);
