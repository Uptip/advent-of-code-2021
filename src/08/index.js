import { sum } from 'lodash';

export const formatInput = input =>
  input
    .split('\n')
    .map(line => line.split('| '))
    .map(line => [
      line[0].split(' ').filter(Boolean),
      line[1].split(' ').filter(Boolean),
    ]);

export const partOne = input =>
  sum(
    input.map(
      ([, lineOutput]) =>
        lineOutput.filter(digit => [2, 3, 4, 7].includes(digit.length)).length,
    ),
  );

export const partTwo = () => {};
