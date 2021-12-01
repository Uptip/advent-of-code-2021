export const formatInput = (input: string) =>
  input.split('\n').filter(Boolean).map(Number);

export const partOne = (input: number[]): number =>
  input.reduce((acc, _, index) => {
    if (index === 0) return acc;
    return acc + (input[index] > input[index - 1] ? 1 : 0);
  }, 0);

export const partTwo = (input: number[]): number =>
  input.reduce((acc, _, index) => {
    if (index < 3) return acc;
    return (
      acc +
      (input[index] + input[index - 1] + input[index - 2] >
      input[index - 1] + input[index - 2] + input[index - 3]
        ? 1
        : 0)
    );
  }, 0);
