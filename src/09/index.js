import { get } from 'lodash';

export const formatInput = input =>
  input.split('\n').map(line => line.split('').map(Number));

const getLowPoints = input => {
  const output = [];

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
  const { x, y } = start;

  if (visited.has(`${x},${y}`) || get(input, [y, x], 9) === 9) {
    return [];
  }

  visited.add(`${x},${y}`);

  return [
    { x, y },
    ...getBasinsPoints({ start: { x: x - 1, y }, input, visited }),
    ...getBasinsPoints({ start: { x: x + 1, y }, input, visited }),
    ...getBasinsPoints({ start: { x, y: y - 1 }, input, visited }),
    ...getBasinsPoints({ start: { x, y: y + 1 }, input, visited }),
  ];
};

export const partOne = input =>
  getLowPoints(input)
    .map(({ x, y }) => input[y][x] + 1)
    .reduce((total, curr) => total + curr, 0);

export const partTwo = input =>
  getLowPoints(input)
    .map(
      coordinates =>
        getBasinsPoints({ start: coordinates, input, visited: new Set() })
          .length,
    )
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((total, curr) => total * curr, 1);
