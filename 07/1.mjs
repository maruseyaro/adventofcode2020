import fs from "fs";

let fileContents = fs.readFileSync("./07/input.sample2.txt", "utf-8");

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
  let cs = getContainersOf(input, "shiny gold");

  return uniq(cs.map((c) => c.type)).length;
};

let getContainersOf = (rules, type) => {
  let containers = rules.filter((c) => c.bags.some((b) => b.type === type));
  let types = containers.map((c) => c.type);

  return types
    .flatMap((type) => getContainersOf(rules, type))
    .concat(containers);
};

let uniq = (xs) => [...new Set(xs)];

console.log(solve(input));
