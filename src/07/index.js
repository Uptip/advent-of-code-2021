import { times, max, sum } from 'lodash';

export const formatInput = input => input.split(',').map(Number);

export const partOne = input =>
  times(max(input)).reduce(
    (cheapest, position) =>
      Math.min(cheapest, sum(input.map(crab => Math.abs(crab - position)))),
    Infinity,
  );

export const partTwo = input =>
  times(max(input)).reduce(
    (cheapest, position) =>
      Math.min(
        cheapest,
        sum(
          input.map(
            crab =>
              (Math.abs(crab - position) * (Math.abs(crab - position) + 1)) / 2,
          ),
        ),
      ),
    Infinity,
  );
