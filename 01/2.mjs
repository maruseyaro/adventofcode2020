export function solve(input) {
  for (let i = 0; i < input.length - 2; i++) {
    for (let j = i + 1; j < input.length - 1; j++) {
      for (let k = j + 1; k < input.length; k++) {
        let a = input[i];
        let b = input[j];
        let c = input[k];

        if (a + b + c === 2020) {
          return a * b * c;
        }
      }
    }
  }

  return -1;
}
