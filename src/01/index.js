export const formatInput = input =>
  input.split('\n').filter(Boolean).map(Number);

export const partOne = input =>
  input.reduce(
    (acc, _, index) =>
      acc + Number(index >= 1 && input[index] > input[index - 1]),
    0,
  );

export const partTwo = input =>
  input.reduce(
    (acc, _, index) =>
      acc +
      Number(
        index >= 3 &&
          input[index] + input[index - 1] + input[index - 2] >
            input[index - 1] + input[index - 2] + input[index - 3],
      ),
    0,
  );
