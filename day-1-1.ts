const text = await Deno.readTextFile("input-day-1.txt");

const firstNumbers: Array<number> = [];
const secondNumbers: Array<number> = [];

for (let i = 0; i < text.length / 14; i++) {
  firstNumbers.push(Number(text.slice(i * 14, i * 14 + 6)));
  secondNumbers.push(Number(text.slice(i * 14 + 7, i * 14 + 7 + 6)));
}

firstNumbers.sort((a, b) => a - b);
secondNumbers.sort((a, b) => a - b);

let totalDistance = 0;

for (let i = 0; i < firstNumbers.length; i++) {
  totalDistance += Math.abs(firstNumbers[i] - secondNumbers[i]);
}

console.log(totalDistance);
