import { cloneDeep, get, times } from 'lodash';

const wait = millis =>
  new Promise(resolve => setTimeout(() => resolve(true), millis));

export const formatInput = input =>
  input.split('\n').map(line => line.split('').map(Number));

export const display = (grid, step) => {
  process.stdout.write(
    '\n' +
      step +
      '\n' +
      grid
        .map(row =>
          row.map(value => (Number(value) === 0 ? '🐡' : '🐟')).join(''),
        )
        .join('\n') +
      '\n',
  );

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

const computeStep = async (grid, step) => {
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
        display(grid, step);
        await wait(10);
      }
    }
  }

  return { grid: cloneDeep(grid), flashed };
};

export const partOne = async input => {
  const currentGrid = cloneDeep(input);
  let totalFlashed = 0;
  let step = 0;

  while (step < 100) {
    const { flashed } = await computeStep(currentGrid);
    totalFlashed += flashed.size;
    step++;
  }

  return totalFlashed;
};

export const partTwo = async input => {
  let step = 0;

  while (true) {
    step += 1;
    const { grid, flashed } = computeStep(input, step);
    await wait(50);
    display(grid, step);

    if (flashed.size === 100) {
      return step;
    }
  }
};
