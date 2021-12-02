export const formatInput = input =>
  input
    .split('\n')
    .map(line => line.split(' '))
    .map(([direction, value]) => [direction, Number(value)]);

export const partOne = input =>
  input.reduce(
    (position, [direction, value]) => {
      switch (direction) {
        case 'up':
          position.depth -= value;
          break;
        case 'down':
          position.depth += value;
          break;
        case 'forward':
          position.horizontal += value;
          break;
      }
      return position;
    },
    { horizontal: 0, depth: 0 },
  ) |> ({ horizontal, depth }) => horizontal * depth;

export const partTwo = input =>
  input.reduce(
    (position, [direction, value]) => {
      switch (direction) {
        case 'up':
          position.aim -= value;
          break;
        case 'down':
          position.aim += value;
          break;
        case 'forward':
          position.horizontal += value;
          position.depth += position.aim * value;
          break;
      }
      return position;
    },
    { horizontal: 0, depth: 0, aim: 0 },
  ) |> ({ horizontal, depth }) => horizontal * depth;
