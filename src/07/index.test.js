import { formatInput, partOne, partTwo } from './';

const input = `16,1,2,0,4,2,7,1,2,14`;

describe('07', () => {
  test('gets correct part one sample answer', () => {
    expect(partOne(formatInput(input))).toBe(37);
  });

  test('gets correct part two sample answer', () => {
    expect(partTwo(formatInput(input))).toBe(168);
  });
});
