import fs from "fs";

let contents = fs.readFileSync("./10/input.sample.txt", "utf-8");

let parseInput = (contents) => {
  return contents.split(/\n/).map((line) => parseInt(line, 10));
};

let input = parseInput(contents);

let selectAdapters = (sourceJoltage, adapters) => {
  let compatibleAdapters = [];

  for (let i = 0; i < adapters.length; i++) {
    let adapterJoltage = adapters[i];
    let diff = adapterJoltage - sourceJoltage;
    let id = adapters.findIndex((a) => a === adapterJoltage);

    if (diff >= 1 && diff <= 3) {
      let adapter = { id, diff, rating: adapterJoltage };
      compatibleAdapters.push(adapter);
    }
  }

  return compatibleAdapters;
};

let solve = (input) => {
  input.sort((a, b) => a - b);

  let highestRating = Math.max(...input);
  let index = input.findIndex((a) => a === highestRating);
  let highestRatedAdapater = { id: index, rating: highestRating };
  let device = { id: input.length, diff: 0, rating: highestRating + 3 };
  let outlet = { id: -1, diff: 0, rating: 0 };
  let nextAdapter = outlet;

  let used = [];
  let ads = [];

  let j = 0;

  while (j < input.length) {
    let possibleAdapters = selectAdapters(nextAdapter, input);

    console.log(possibleAdapters);

    for (let i = 0; i < possibleAdapters.length; i++) {
      let adapter = possibleAdapters[i];

      if (!used.includes(adapter.id)) {
        nextAdapter = adapter;
        used.push(nextAdapter.id);
        ads.push(nextAdapter);
      }
    }

    j++;
  }

  return ads;
};

console.log(solve(input));
