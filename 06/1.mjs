export let solve = (input) => {
  return input.map(countAnswers).reduce((a, b) => a + b, 0);
};

let countAnswers = (group) => {
  return [...new Set(group.flatMap((g) => g))].length;
};
