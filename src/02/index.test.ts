import { formatInput, partOne, partTwo } from './';

const input = `forward 5
down 5
forward 8
up 3
down 8
forward 2`;

test('gets correct part one sample answer', () => {
  expect(partOne(formatInput(input))).toBe(150);
});

test('gets correct part two sample answer', () => {
  expect(partTwo(formatInput(input))).toBe(900);
});
