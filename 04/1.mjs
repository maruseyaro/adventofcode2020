let requiredFields = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];

export function solve(input) {
  return input.map(isPassportValid).reduce((a, b) => a + b, 0);
}

function isPassportValid(passport) {
  let fields = Object.keys(passport);

  let i = 0;

  while (i < requiredFields.length) {
    if (!fields.includes(requiredFields[i])) {
      return false;
    }

    i++;
  }

  return true;
}
