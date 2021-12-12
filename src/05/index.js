import { groupBy, max, times } from 'lodash';

export const formatInput = input =>
  input
    .split('\n')
    .filter(Boolean)
    .map(pipe =>
      pipe.split(' -> ').map(coordinate => coordinate.split(',').map(Number)),
    );

const generateDiagram = ({ input, output }) => {
  const lines = max(input.flat().map(([x]) => x)) + 1;
  const columns = max(input.flat().map(([, y]) => y)) + 1;

  console.log(
    times(lines, y =>
      times(
        columns,
        x =>
          output.filter(coordinate => coordinate === `${x},${y}`).length || '.',
      ).join(''),
    ).join('\n'),
    '\n',
  );

  return output;
};

const getCoordinates = ([start, end]) => {
  let current = [...start];
  const output = [[...current]];

  while (current[0] !== end[0] || current[1] !== end[1]) {
    if (end[0] !== start[0]) {
      current[0] += end[0] > start[0] ? 1 : -1;
    }
    if (end[1] !== start[1]) {
      current[1] += end[1] > start[1] ? 1 : -1;
    }
    output.push([...current]);
  }
  return output;
};

const ignoreDiagonals = ([[startX, startY], [endX, endY]]) =>
  startX === endX || startY === endY;

const countDuplicates = input =>
  Object.values(groupBy(input)).filter(v => v.length > 1).length;

export const partOne = input =>
  input
    .filter(ignoreDiagonals)
    .map(getCoordinates)
    .flat()
    .map(x => x.join(','))
  |> output => generateDiagram({ input, output })
  |> countDuplicates;

export const partTwo = input =>
  input
    .map(getCoordinates)
    .flat()
    .map(x => x.join(','))
  |> output => generateDiagram({ input, output })
  |> countDuplicates;
