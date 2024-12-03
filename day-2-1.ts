const text = await Deno.readTextFile("input-day-2.txt");

let amountOfSafeReports = 0;

text.split("\n").map((value) => {
  const splittedValue = value.split(" ").map((value) => Number(value));

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
    amountOfSafeReports++;
  }
});

console.log(amountOfSafeReports);
