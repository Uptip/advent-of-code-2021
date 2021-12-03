import { formatInput, partOne, partTwo } from './';

const input = `00100
11110
10110
10111
10101
01111
00111
11100
10000
11001
00010
01010`;

describe('03', () => {
  test('gets correct part one sample answer', () => {
    expect(partOne(formatInput(input))).toBe(198);
  });

  test('gets correct part two sample answer', () => {
    expect(partTwo(formatInput(input))).toBe(230);
  });
});
