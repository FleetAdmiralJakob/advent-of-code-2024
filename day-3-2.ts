const text = await Deno.readTextFile("input-day-3.txt");

let endResult = 0;
let enabled = true;

text.matchAll(/(mul\(\d+,\d+\)|do\(\)|don't\(\))/g).forEach((value) => {
  const multiplication = value[0];

  if (multiplication.includes("do(")) {
    enabled = true;
    return;
  } else if (multiplication.includes("don")) {
    enabled = false;
    return;
  } else if (!enabled) {
    return;
  }

  const firstNumber = Number(
    multiplication.split(",").shift()!.split("(").pop(),
  );
  const secondNumber = Number(
    multiplication.split(",").pop()!.split(")").shift(),
  );

  endResult += firstNumber * secondNumber;
});

console.log(endResult);
