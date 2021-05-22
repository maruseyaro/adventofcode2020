import { readFileSync } from "fs";
import { solve } from "./1.mjs";

let fileContents = readFileSync("./01/input.txt", "utf-8");
let input = fileContents.split("\n").map((line) => parseInt(line, 10));

let solution = solve(input);

console.log(solution);
