import { readFileSync } from "fs";
import { solve } from "./2.mjs";

let fileContents = readFileSync("./02/input.txt", "utf-8");

let parseFileContents = (contents) => {
  let lines = contents.split("\n").map((line) => {
    let [policyText, password] = line.split(": ");
    let [, minText, maxText] = policyText.match(/(\d+)-(\d+)/);
    let [char] = policyText.match(/[a-zA-Z]/);

    return {
      policy: {
        min: parseInt(minText, 10),
        max: parseInt(maxText, 10),
        char,
      },
      password,
    };
  });

  return lines;
};

let input = parseFileContents(fileContents);
let solution = solve(input);

console.log(solution);
