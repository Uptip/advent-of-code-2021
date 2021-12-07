import { times, max, sum } from 'lodash';

export const formatInput = input => input.split(',').map(Number);

export const partOne = input =>
  times(max(input)).reduce((cheapest, position) => {
    const cost = sum(input.map(crab => Math.abs(crab - position)));

    if (!cheapest || cost < cheapest) {
      return cost;
    }

    return cheapest;
  }, 0);

export const partTwo = input =>
  times(max(input)).reduce((cheapest, position) => {
    const cost = sum(
      input.map(
        crab =>
          (Math.abs(crab - position) * (Math.abs(crab - position) + 1)) / 2,
      ),
    );

    if (!cheapest || cost < cheapest) {
      return cost;
    }

    return cheapest;
  }, 0);
