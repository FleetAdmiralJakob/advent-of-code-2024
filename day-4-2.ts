const text = await Deno.readTextFile("input-day-4.txt");

let xmasCount = 0;

const lines = text.split(/\r?\n/);

type CoordinateStore = { x: number; y: number }[];

const checkForXmas = (
  line: string,
  index: number,
  diagonal: "first" | "second",
): CoordinateStore => {
  let diagonalMatches: CoordinateStore = [];

  line.matchAll(/MAS/g).forEach((value) => {
    if (diagonal === "first") {
      diagonalMatches.push({
        x: index < 0 ? value.index + 1 : Math.abs(index) + value.index + 1,
        y: index < 0 ? Math.abs(index) + value.index + 1 : value.index + 1,
      });
    } else {
      diagonalMatches.push({
        x:
          lines[0].length -
          1 -
          (index < 0 ? value.index + 1 : Math.abs(index) + value.index + 1),
        y: index < 0 ? Math.abs(index) + value.index + 1 : value.index + 1,
      });
    }
  });

  line.matchAll(/SAM/g).forEach((value) => {
    if (diagonal === "first") {
      diagonalMatches.push({
        x: index < 0 ? value.index + 1 : Math.abs(index) + value.index + 1,
        y: index < 0 ? Math.abs(index) + value.index + 1 : value.index + 1,
      });
    } else {
      diagonalMatches.push({
        x:
          lines[0].length -
          1 -
          (index < 0 ? value.index + 1 : Math.abs(index) + value.index + 1),
        y: index < 0 ? Math.abs(index) + value.index + 1 : value.index + 1,
      });
    }
  });

  return diagonalMatches!;
};

const firstDiagonal: Array<string> = [];

for (const [lineIndex, line] of lines.entries()) {
  for (let i = 0; i < line.length; i++) {
    // First Diagonal lines
    let iteratorFirstDiagonal = i - lineIndex;

    if (lineIndex > line.length) {
      iteratorFirstDiagonal += lineIndex;
    }

    if (firstDiagonal[iteratorFirstDiagonal] === undefined) {
      firstDiagonal[iteratorFirstDiagonal] = "";
    }
    firstDiagonal[iteratorFirstDiagonal] = firstDiagonal[
      iteratorFirstDiagonal
    ].concat(line.charAt(i));
  }
}

let firstDiagonalMatches: CoordinateStore = [];

for (let i = -firstDiagonal.length + 1; i < firstDiagonal.length; i++) {
  const diagonalLine = firstDiagonal[i];
  checkForXmas(diagonalLine, i, "first").forEach((value) =>
    firstDiagonalMatches.push(value),
  );
}

const secondDiagonal: Array<string> = [];

for (let [lineIndex, line] of lines.entries()) {
  line = line.split("").reverse().join("");

  for (let i = 0; i < line.length; i++) {
    // Second Diagonal lines
    let iteratorSecondDiagonal = i - lineIndex;

    if (lineIndex > line.length) {
      iteratorSecondDiagonal += lineIndex;
    }

    if (secondDiagonal[iteratorSecondDiagonal] === undefined) {
      secondDiagonal[iteratorSecondDiagonal] = "";
    }
    secondDiagonal[iteratorSecondDiagonal] = secondDiagonal[
      iteratorSecondDiagonal
    ].concat(line.charAt(i));
  }
}

let secondDiagonalMatches: CoordinateStore = [];

for (let i = -secondDiagonal.length + 1; i < secondDiagonal.length; i++) {
  const diagonalLine = secondDiagonal[i];
  checkForXmas(diagonalLine, i, "second").forEach((value) =>
    secondDiagonalMatches.push(value),
  );
}

// Find values with same location in both

firstDiagonalMatches.forEach((valueFirst) => {
  secondDiagonalMatches.forEach((valueSecond) => {
    if (valueFirst.x === valueSecond.x && valueFirst.y === valueSecond.y) {
      xmasCount++;
    }
  });
});

// console.log(firstDiagonalMatches);
// console.log(secondDiagonalMatches);

console.log(xmasCount);
