import { formatInput, partOne, partTwo } from './';

const input = `2199943210
3987894921
9856789892
8767896789
9899965678`;

describe('09', () => {
  test('gets correct part one sample answer', () => {
    expect(partOne(formatInput(input))).toBe(15);
  });

  test('gets correct part two sample answer', () => {
    expect(partTwo(formatInput(input))).toBe(1134);
  });
});
