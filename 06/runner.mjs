import fs from "fs";
import { solve } from "./2.mjs";

let contents = fs.readFileSync("./06/input.txt", "utf-8");

let parseInput = (contents) => {
  let groups = contents.split(/\n\n/);
  let ans = groups.map((g) => g.split(/\n/).map((a) => a.split("")));
  return ans;
};

let input = parseInput(contents);

console.log(solve(input));
