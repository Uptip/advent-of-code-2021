import { inRange, isEqual, times } from 'lodash';

export const formatInput = input =>
  input.split('\n').map(line => line.split('').map(Number));

const getShorterstPath = (input, position = [0, 0]) => {
  const dimensionX = input[0].length;
  const dimensionY = input.length;

  const deltas = [
    [1, 0],
    [0, 1],
    [-1, 0],
    [0, -1],
  ];

  const queue = [{ position, cost: 0 }];
  const visited = new Set();

  while (queue.length) {
    const { position, cost } = queue.shift();
    const [x, y] = position;

    if (y === dimensionY - 1 && x === dimensionX - 1) {
      return cost;
    }

    deltas
      .map(([dx, dy]) => [x + dx, y + dy])
      .filter(
        ([x, y]) =>
          inRange(y, 0, dimensionY) &&
          inRange(x, 0, dimensionX) &&
          !visited.has([x, y].join(',')),
      )
      .forEach(position => {
        visited.add(position.join(','));
        queue.push({ position, cost: cost + input[position[1]][position[0]] });
      });

    queue.sort((a, b) => a.cost - b.cost);
  }
};

export const partOne = input => getShorterstPath(input);

export const partTwo = input => {
  const dimensionX = input[0].length;
  const dimensionY = input.length;

  const expandedInput = times(dimensionY * 5).map(y =>
    times(dimensionX * 5).map(x => {
      const baseValue = input[y % input.length][x % input[0].length];
      const deltaX = Math.floor(x / dimensionX);
      const deltaY = Math.floor(y / dimensionY);

      return ((baseValue - 1 + deltaX + deltaY) % 9) + 1;
    }),
  );

  return getShorterstPath(expandedInput);
};
