import { times, max, sum } from 'lodash';

export const formatInput = input => input.split(',').map(Number);

export const partOne = input => {
  let cheapest = null;

  times(max(input)).forEach(position => {
    const cost = sum(input.map(crab => Math.abs(crab - position)));
    if (!cheapest || cost < cheapest) {
      cheapest = cost;
    }
  });

  return cheapest;
};

export const partTwo = input => {
  let cheapest = null;

  times(max(input)).forEach(position => {
    const cost = sum(
      input.map(
        crab =>
          (Math.abs(crab - position) * (Math.abs(crab - position) + 1)) / 2,
      ),
    );
    if (!cheapest || cost < cheapest) {
      cheapest = cost;
    }
  });

  return cheapest;
};
