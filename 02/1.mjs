export function solve(input) {
  return input
    .map((item) => isPasswordValid(item.policy, item.password))
    .filter(Boolean).length;
}

function isPasswordValid(policy, password) {
  let { char, min, max } = policy;
  let count = 0;
  let i = 0;

  while (i < password.length) {
    let passwordChar = password[i];

    if (passwordChar === char) {
      count++;
    }

    if (count > max) {
      return false;
    }

    i++;
  }

  return count >= min;
}
