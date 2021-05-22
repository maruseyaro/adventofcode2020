import { readFileSync } from "fs";
import { solve } from "./2.mjs";

let fileContents = readFileSync("./03/input.txt", "utf-8");

let parseFileContents = (contents) => {
  let lines = contents.split(/\n/);
  return lines.map((line) => line.split(""));
};

let input = parseFileContents(fileContents);

console.log(input);

let solution = solve(input);

console.log(solution);
