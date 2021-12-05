import { formatInput, partOne, partTwo } from './';

const input = `0,9 -> 5,9
8,0 -> 0,8
9,4 -> 3,4
2,2 -> 2,1
7,0 -> 7,4
6,4 -> 2,0
0,9 -> 2,9
3,4 -> 1,4
0,0 -> 8,8
5,5 -> 8,2`;

describe('05', () => {
  test('gets correct part one sample answer', () => {
    expect(partOne(formatInput(input))).toBe(5);
  });

  test('gets correct part two sample answer', () => {
    expect(partTwo(formatInput(input))).toBe(12);
  });
});
