import { last } from 'lodash';
import { median } from 'ramda';

export const formatInput = input =>
  input.split('\n').map(line => line.split(''));

const openingBlocks = {
  '(': { closing: ')', score: 1 },
  '[': { closing: ']', score: 2 },
  '{': { closing: '}', score: 3 },
  '<': { closing: '>', score: 4 },
};
const closingBlocks = {
  ')': { opening: '(', score: 3 },
  ']': { opening: '[', score: 57 },
  '}': { opening: '{', score: 1197 },
  '>': { opening: '<', score: 25137 },
};

const compute = input => {
  let corruptedScore = 0;
  const incompleteLinesScores = [];

  for (let l = 0; l < input.length; l++) {
    const line = input[l];
    const openBlocks = [];
    let lineIsCorrupted = false;

    for (let i = 0; i < line.length; i++) {
      const char = line[i];

      if (Object.keys(openingBlocks).includes(char)) {
        openBlocks.push(char);
        continue;
      }

      if (Object.keys(closingBlocks).includes(char)) {
        if (closingBlocks[char]?.opening !== last(openBlocks)) {
          lineIsCorrupted = true;
          corruptedScore += closingBlocks[char].score;
          break;
        } else {
          openBlocks.pop();
        }
      }
    }

    if (!lineIsCorrupted) {
      incompleteLinesScores.push(
        [...openBlocks]
          .reverse()
          .map(opening => openingBlocks[opening].score)
          .reduce((acc, curr) => 5 * acc + curr, 0),
      );
    }
  }

  return {
    partOne: corruptedScore,
    partTwo: median(incompleteLinesScores),
  };
};

export const partOne = input => compute(input).partOne;
export const partTwo = input => compute(input).partTwo;
