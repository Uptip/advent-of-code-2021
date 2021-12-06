import { countBy, sum } from 'lodash';

export const formatInput = input => input.split(',').map(Number);

const solutionThatDoesNotWork = ({ input, days }) => {
  let output = [...input];

  for (let day = 0; day < days; day++) {
    let input = [...output];
    let nextOutput = [];

    for (let i = 0; i < input.length; i++) {
      if (input[i] === 0) {
        nextOutput.push(6);
        nextOutput.push(8);
      } else {
        nextOutput.push(input[i] - 1);
      }
    }
    output = [...nextOutput];
  }

  return output.length;
};

const solutionThatWorks = ({ input, days }) => {
  let output = countBy(input);

  for (let day = 0; day < days; day++) {
    let nextOutput = {};

    for (let key in output) {
      key = Number(key);
      const value = output[key];

      if (key === 0) {
        nextOutput[6] = value;
        nextOutput[8] = value;
      } else {
        nextOutput[key - 1] = (nextOutput[key - 1] || 0) + value;
      }
    }

    output = { ...nextOutput };
  }

  return Object.values(output).reduce((total, curr) => total + curr, 0);
};

export const partOne = input => solutionThatWorks({ input, days: 80 });
export const partTwo = input => solutionThatWorks({ input, days: 256 });
