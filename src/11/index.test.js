import { formatInput, partOne, partTwo } from './';

const input = `5483143223
2745854711
5264556173
6141336146
6357385478
4167524645
2176841721
6882881134
4846848554
5283751526`;

describe('11', () => {
  test('gets correct part one sample answer', () => {
    expect(partOne(formatInput(input))).toBe(1656);
  });

  test('gets correct part two sample answer', () => {
    expect(partTwo(formatInput(input))).toBe(195);
  });
});
