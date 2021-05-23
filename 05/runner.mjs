import { readFileSync } from "fs";
import { parseInput, solve } from "./2.mjs";

let fileContents = readFileSync("./05/input.txt", "utf-8");

let input = parseInput(fileContents);
let solution = solve(input);

console.log(solution);
