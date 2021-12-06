import { formatInput, partOne, partTwo } from './';

const input = `3,4,3,1,2`;

describe('06', () => {
  test('gets correct part one sample answer', () => {
    expect(partOne(formatInput(input))).toBe(5934);
  });

  test('gets correct part two sample answer', () => {
    expect(partTwo(formatInput(input))).toBe(26984457539);
  });
});
