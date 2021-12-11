import { cloneDeep, get } from 'lodash';

export const formatInput = input =>
  input.split('\n').map(line => line.split('').map(Number));

export const display = grid => {
  console.log(grid.map(row => row.join('')).join('\n'));
  return grid;
};

const flash = ({ grid, x, y, flashed }) => {
  flashed.add(`${x},${y}`);
  grid[y][x] = 0;

  [-1, 0, 1].forEach(dy => {
    [-1, 0, 1].forEach(dx => {
      if (
        get(grid, [y + dy, x + dx], Infinity) <= 9 &&
        !flashed.has(`${x + dx},${y + dy}`)
      ) {
        grid[y + dy][x + dx] += 1;

        if (grid[y + dy][x + dx] === 10) {
          flash({ grid, x: x + dx, y: y + dy, flashed });
        }
      }
    });
  });

  return grid;
};

const computeStep = grid => {
  let flashed = new Set();

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      grid[y][x]++;
    }
  }

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (grid[y][x] === 10) {
        flash({ grid, x, y, flashed });
      }
    }
  }

  return { grid, flashed };
};

export const partOne = input => {
  const currentGrid = cloneDeep(input);
  let totalFlashed = 0;
  let step = 0;

  while (step < 100) {
    const { flashed } = computeStep(currentGrid);
    totalFlashed += flashed.size;
    step++;
  }

  return totalFlashed;
};

export const partTwo = input => {
  let currentGrid = cloneDeep(input);
  let step = 0;

  while (true) {
    step += 1;
    const { grid, flashed } = computeStep(currentGrid);

    if (flashed.size === 100) {
      return step;
    }
  }
};
