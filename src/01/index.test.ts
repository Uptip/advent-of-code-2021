import { formatInput, partOne, partTwo } from './';

const partOneInput = `199
200
208
210
200
207
240
269
260
263`;

test('gets correct part one sample answer', () => {
  expect(partOne(formatInput(partOneInput))).toBe(7);
});

test('gets correct part two sample answer', () => {
  expect(partTwo(formatInput(partOneInput))).toBe(5);
});
