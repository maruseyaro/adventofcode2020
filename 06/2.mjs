export let solve = (input) => {
  return input.map(countAnswers).reduce((a, b) => a + b, 0);
};

let countAnswers = (group) => {
  let ans = {};

  for (let person of group) {
    for (let answer of person) {
      ans[answer] = ans[answer] ? ans[answer] + 1 : 1;
    }
  }

  return Object.entries(ans).filter(([_, val]) => val === group.length).length;
};
