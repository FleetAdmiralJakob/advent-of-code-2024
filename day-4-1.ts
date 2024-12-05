const text = await Deno.readTextFile("input-day-4.txt");

let xmasCount = 0;

const lines = text.split(/\r?\n/);
let verticalLines: Array<string> = [];
let firstDiagonal: Array<string> = [];

const checkForXmas = (line: string) => {
  line.matchAll(/XMAS/g).forEach(() => {
    xmasCount++;
  });
  line.matchAll(/SAMX/g).forEach(() => {
    xmasCount++;
  });
};

for (const [lineIndex, line] of lines.entries()) {
  for (let i = 0; i < line.length; i++) {
    // Vertical lines
    if (verticalLines[i] === undefined) {
      verticalLines[i] = "";
    }
    verticalLines[i] = verticalLines[i].concat(line.charAt(i));

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

  checkForXmas(line);
}

for (const verticalLine of verticalLines) {
  checkForXmas(verticalLine);
}

for (let i = -firstDiagonal.length + 1; i < firstDiagonal.length; i++) {
  const diagonalLine = firstDiagonal[i];
  checkForXmas(diagonalLine);
}

let secondDiagonal: Array<string> = [];

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

for (let i = -secondDiagonal.length + 1; i < secondDiagonal.length; i++) {
  const diagonalLine = secondDiagonal[i];
  checkForXmas(diagonalLine);
}

console.log(xmasCount);
