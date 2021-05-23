let ranges = {
  byr: [1920, 2002],
  iyr: [2010, 2020],
  eyr: [2020, 2030],
};

let requiredFields = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];

let parseYear = (str) => {
  let match = str.match(/^\d{4}$/);

  if (!match) {
    throw new Error("invalid year");
  }

  return parseInt(match[0], 10);
};

let rangeValidator = (min, max) => (value) => {
  return value >= min && value <= max;
};

let yearRangeParser = (min, max) => (str) => {
  let year = parseYear(str);
  let isWithinRange = rangeValidator(min, max);

  if (!isWithinRange(year)) {
    throw new Error(`Invalid year range ${min} < ${year} < ${max}`);
  }

  return year;
};

let parseIyr = yearRangeParser(...ranges.iyr);
let parseByr = yearRangeParser(...ranges.byr);
let parseEyr = yearRangeParser(...ranges.eyr);

let parseHgt = (str) => {
  let match = str.match(/^(\d+)(in|cm)$/);

  if (!match) {
    throw new Error("Invalid height");
  }

  let height = {
    value: parseInt(match[1], 10),
    unit: match[2],
  };

  if (height.unit === "in") {
    let isWithinRange = rangeValidator(59, 76);

    if (!isWithinRange(height.value)) {
      throw new Error("Invalid height in in");
    }
  }

  if (height.unit === "cm") {
    let isWithinRange = rangeValidator(150, 193);

    if (!isWithinRange(height.value)) {
      throw new Error("Invalid height in cm");
    }
  }

  return height;
};

let parseHcl = (str) => {
  let match = str.match(
    /^#(\d|[a-f])(\d|[a-f])(\d|[a-f])(\d|[a-f])(\d|[a-f])(\d|[a-f])$/
  );

  if (!match) {
    throw new Error("Invalid hcl");
  }

  return match[0];
};

let parseEcl = (str) => {
  let colors = ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"];

  if (!colors.includes(str)) {
    throw new Error("Invalid color");
  }

  return str;
};

let parsePid = (str) => {
  let match = str.match(/^\d{9}$/);

  if (!match) {
    throw new Error("Invalid pid");
  }

  return match[0];
};

let parsers = {
  byr: parseByr,
  iyr: parseIyr,
  eyr: parseEyr,
  hgt: parseHgt,
  hcl: parseHcl,
  ecl: parseEcl,
  pid: parsePid,
  cid: (str) => str,
};

let areRequiredFieldsPresent = (passport) => {
  let fields = Object.keys(passport);

  let i = 0;

  while (i < requiredFields.length) {
    if (!fields.includes(requiredFields[i])) {
      return false;
    }

    i++;
  }

  return true;
};

export function solve(input) {
  return input.map(isPassportValid).reduce((a, b) => a + b, 0);
}

function isPassportValid(passport) {
  if (!areRequiredFieldsPresent(passport)) {
    return false;
  }

  for (let [field, value] of Object.entries(passport)) {
    let parse = parsers[field];

    try {
      parse(value);
    } catch (err) {
      return false;
    }
  }

  return true;
}
