const text = await Deno.readTextFile("input-day-3.txt");

let endResult = 0;

text.matchAll(/mul\(\d+,\d+\)/g).forEach((value) => {
  const multiplication = value[0];
  const firstNumber = Number(
    multiplication.split(",").shift()!.split("(").pop(),
  );
  const secondNumber = Number(
    multiplication.split(",").pop()!.split(")").shift(),
  );

  endResult += firstNumber * secondNumber;
});

console.log(endResult);
