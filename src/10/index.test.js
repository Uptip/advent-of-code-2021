import { formatInput, partOne, partTwo } from './';

const input = `[({(<(())[]>[[{[]{<()<>>
  [(()[<>])]({[<{<<[]>>(
  {([(<{}[<>[]}>{[]{[(<()>
  (((({<>}<{<{<>}{[]{[]{}
  [[<[([]))<([[{}[[()]]]
  [{[{({}]{}}([{[{{{}}([]
  {<[[]]>}<{[{[{[]{()[[[]
  [<(<(<(<{}))><([]([]()
  <{([([[(<>()){}]>(<<{{
  <{([{{}}[<[[[<>{}]]]>[]]`;

describe('10', () => {
  test('gets correct part one sample answer', () => {
    expect(partOne(formatInput(input))).toBe(26397);
  });

  test('gets correct part two sample answer', () => {
    expect(partTwo(formatInput(input))).toBe(288957);
  });
});
