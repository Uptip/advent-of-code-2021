import { formatInput, partOne, partTwo } from './';

const input = `start-A
start-b
A-c
A-b
b-d
A-end
b-end`;

const slightlyLargerInput = `dc-end
HN-start
start-kj
dc-start
dc-HN
LN-dc
HN-end
kj-sa
kj-HN
kj-dc`;

const evenLargerInput = `fs-end
he-DX
fs-he
start-DX
pj-DX
end-zg
zg-sl
zg-pj
pj-he
RW-he
fs-DX
pj-RW
zg-RW
start-pj
he-WI
zg-he
pj-fs
start-RW`;

describe('12', () => {
  test('gets correct part one sample answer', () => {
    expect(partOne(formatInput(input))).toBe(10);
    expect(partOne(formatInput(slightlyLargerInput))).toBe(19);
    expect(partOne(formatInput(evenLargerInput))).toBe(226);
  });

  test('gets correct part two sample answer', () => {
    expect(partTwo(formatInput(input))).toBe(36);
    expect(partTwo(formatInput(slightlyLargerInput))).toBe(103);
    expect(partTwo(formatInput(evenLargerInput))).toBe(3509);
  });
});
