export function solve(input) {
  for (let i = 0; i < input.length - 1; i++) {
    for (let j = i + 1; j < input.length; j++) {
      let a = input[i];
      let b = input[j];

      if (a + b === 2020) {
        return a * b;
      }
    }
  }

  return -1;
}
