import { max, times } from 'lodash';

export const formatInput = input =>
  input.split('\n\n')
  |> ([dots, instructions]) => ({
    dots: dots.split('\n'),
    instructions: instructions
      .replace(/fold along /g, '')
      .split('\n')
      .map(instruction => instruction.split('='))
      .map(([axis, value]) => [axis, Number(value)]),
  });

const displayGrid = dots => {
  const [dimensionX, dimensionY] = [
    max([...dots].map(coordinate => Number(coordinate.split(',')[0]))) + 1,
    max([...dots].map(coordinate => Number(coordinate.split(',')[1]))) + 1,
  ];

  const grid = times(dimensionY, () => times(dimensionX, () => '  '));

  dots.forEach(dot => {
    const [x, y] = dot.split(',').map(Number);
    grid[y][x] = '▉▉';
  });

  return '\n' + grid.map(line => line.join('')).join('\n');
};

const fold = ({ dots, instruction }) => {
  const [axis, foldPosition] = instruction;
  const draft = new Set();

  dots.forEach(dot => {
    const [x, y] = dot.split(',').map(Number);
    if (axis === 'x') {
      if (x < foldPosition) {
        draft.add(`${x},${y}`);
      } else {
        draft.add(`${foldPosition - (x - foldPosition)},${y}`);
      }
    } else {
      if (y < foldPosition) {
        draft.add(`${x},${y}`);
      } else {
        draft.add(`${x},${foldPosition - (y - foldPosition)}`);
      }
    }
  });

  return draft;
};

export const partOne = ({ dots, instructions }) =>
  fold({ dots, instruction: instructions[0] }).size;

export const partTwo = ({ dots, instructions }) =>
  instructions.reduce((dots, instruction) => fold({ dots, instruction }), dots)
  |> displayGrid;
