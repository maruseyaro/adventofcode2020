export function solve(input) {
  return input
    .map((item) => isPasswordValid(item.policy, item.password))
    .filter(Boolean).length;
}

function isPasswordValid(policy, password) {
  let { char, min, max } = policy;
  let charAtMin = password[min - 1];
  let charAtMax = password[max - 1];
  let sameChars = [charAtMin, charAtMax].filter((c) => c === char);

  return sameChars.length === 1;
}
