const text = await Deno.readTextFile("input-day-2.txt");

let amountOfSafeReports = 0;

function isReportSafe(splittedValue: Array<number>) {
  let order: "initial" | "asc" | "desc" | "error" = "initial";

  for (let i = 1; i < splittedValue.length; i++) {
    const isInRange =
      Math.abs(splittedValue[i - 1] - splittedValue[i]) > 0 &&
      Math.abs(splittedValue[i - 1] - splittedValue[i]) < 4;

    if (order === "initial") {
      if (splittedValue[i - 1] > splittedValue[i] && isInRange) {
        order = "desc";
      } else if (splittedValue[i - 1] < splittedValue[i] && isInRange) {
        order = "asc";
      } else {
        order = "error";
      }
    } else if (order === "error") {
      continue;
    } else if (order === "desc") {
      if (!(splittedValue[i - 1] > splittedValue[i] && isInRange)) {
        order = "error";
      }
    } else if (order === "asc") {
      if (!(splittedValue[i - 1] < splittedValue[i] && isInRange)) {
        order = "error";
      }
    }
  }

  if (order === "asc" || order === "desc") {
    return true;
  } else {
    return false;
  }
}

text.split("\n").map((value) => {
  const splittedValue = value.split(" ").map((value) => Number(value));

  if (isReportSafe(splittedValue)) {
    amountOfSafeReports++;
  } else {
    let isSafe = false;

    splittedValue.forEach((_, index) => {
      if (!isSafe) {
        if (isReportSafe(splittedValue.toSpliced(index, 1))) {
          isSafe = true;
        }
      }
    });

    if (isSafe) {
      amountOfSafeReports++;
    }
  }
});

console.log(amountOfSafeReports);
