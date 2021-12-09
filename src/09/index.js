import { get, sum } from 'lodash';

export const formatInput = input =>
  input.split('\n').map(line => line.split('').map(Number));

const getLowPoints = input => {
  let output = [];

  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
      let height = input[y][x];

      if (
        height < get(input, [y, x - 1], Infinity) &&
        height < get(input, [y, x + 1], Infinity) &&
        height < get(input, [y - 1, x], Infinity) &&
        height < get(input, [y + 1, x], Infinity)
      ) {
        output.push({ x, y });
      }
    }
  }

  return output;
};

const getBasinsPoints = ({ start, input, visited }) => {
  let { x, y } = start;

  if (visited.includes(`${x}-${y}`)) {
    return [];
  } else {
    visited.push(`${x}-${y}`);
  }

  if (get(input, [y, x], 9) === 9) {
    return [];
  }

  return [
    { x, y },
    ...getBasinsPoints({ start: { x: x - 1, y }, input, visited }),
    ...getBasinsPoints({ start: { x: x + 1, y }, input, visited }),
    ...getBasinsPoints({ start: { x, y: y - 1 }, input, visited }),
    ...getBasinsPoints({ start: { x, y: y + 1 }, input, visited }),
  ];
};

export const partOne = input =>
  sum(getLowPoints(input).map(({ x, y }) => input[y][x] + 1));

export const partTwo = input =>
  getLowPoints(input)
    .map(
      coordinates =>
        getBasinsPoints({ start: coordinates, input, visited: [] }).length,
    )
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((total, curr) => total * curr, 1);
