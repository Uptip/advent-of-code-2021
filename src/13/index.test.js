import { formatInput, partOne, partTwo } from './';

const input = `6,10
0,14
9,10
0,3
10,4
4,11
6,0
6,12
4,1
0,13
10,12
3,4
3,0
8,4
1,10
2,14
8,10
9,0

fold along y=7
fold along x=5`;

describe('13', () => {
  test('gets correct part one sample answer', () => {
    expect(partOne(formatInput(input))).toBe(17);
  });

  test('gets correct part two sample answer', () => {
    expect(partTwo(formatInput(input))).toBe(`
▉▉▉▉▉
▉   ▉
▉   ▉
▉   ▉
▉▉▉▉▉`);
  });
});
