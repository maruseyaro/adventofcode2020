import fs from "fs";

let fileContents = fs.readFileSync("./07/input.txt", "utf-8");

let parseInput = (contents) => {
  return contents.split(/\n/).map(parseLine);
};

let parseLine = (line) => {
  let regexEmpty = /(.*) bags contain no other bags.$/;
  let regexContainer = /(.*) bags? contain (.*)\.$/;

  let regex = /(\d+) (.*) bags?/;

  let matchEmpty = line.match(regexEmpty);

  if (matchEmpty) {
    return {
      type: matchEmpty[1],
      bags: [],
    };
  }

  let [_, type, rest] = line.match(regexContainer);

  return {
    type,
    bags: rest.split(", ").map((text) => {
      let match = text.match(regex);

      if (!match) {
        throw new Error("Cannot parse");
      }

      return {
        type: match[2],
        count: parseInt(match[1], 10),
      };
    }),
  };
};

let input = parseInput(fileContents);

let solve = (input) => {
  return count(input, "shiny gold") - 1;
};

let count = (rules, type) => {
  let rule = rules.find((r) => r.type === type);

  return rule.bags.reduce(
    (acc, next) => acc + next.count * count(rules, next.type),
    1
  );
};

console.log(solve(input));
