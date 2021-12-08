import { sum, difference, isEmpty, orderBy } from 'lodash';

export const formatInput = input =>
  input
    .split('\n')
    .map(line => line.split('| '))
    .map(line => [
      line[0].split(' ').filter(Boolean),
      line[1].split(' ').filter(Boolean),
    ]);

export const partOne = input =>
  sum(
    input.map(
      ([, lineOutput]) =>
        lineOutput.filter(digit => [2, 3, 4, 7].includes(digit.length)).length,
    ),
  );

const orderDigits = digits => digits.split('').sort().join('');

export const partTwo = input =>
  sum(
    input.map(([inputDigits, outputDigits]) => {
      let digitToDecimal = {};
      let decimalToDigit = {};

      // Unique segments count (1, 4, 7, 8)
      for (let digit of inputDigits) {
        switch (digit.length) {
          case 2:
            digitToDecimal[orderDigits(digit)] = '1';
            decimalToDigit[1] = digit;
            break;
          case 3:
            digitToDecimal[orderDigits(digit)] = '7';
            decimalToDigit[7] = digit;
            break;
          case 4:
            digitToDecimal[orderDigits(digit)] = '4';
            decimalToDigit[4] = digit;
            break;
          case 7:
            digitToDecimal[orderDigits(digit)] = '8';
            decimalToDigit[8] = digit;
            break;
          default:
            break;
        }
      }

      let fiveSegmentsDigits = inputDigits.filter(digit => digit.length === 5); // (2, 3, 5)
      let sixSegmentsDigits = inputDigits.filter(digit => digit.length === 6); // (0, 6, 9)

      // 3
      decimalToDigit[3] = fiveSegmentsDigits.find(digit =>
        isEmpty(difference(decimalToDigit[7].split(''), digit.split(''))),
      );
      digitToDecimal[orderDigits(decimalToDigit[3])] = '3';

      // 6
      decimalToDigit[6] = sixSegmentsDigits.find(
        digit =>
          !isEmpty(difference(decimalToDigit[7].split(''), digit.split(''))),
      );

      digitToDecimal[orderDigits(decimalToDigit[6])] = '6';

      // 5
      decimalToDigit[5] = fiveSegmentsDigits.find(digit =>
        isEmpty(difference(digit.split(''), decimalToDigit[6].split(''))),
      );

      digitToDecimal[orderDigits(decimalToDigit[5])] = '5';

      // 9
      decimalToDigit[9] = sixSegmentsDigits.find(digit =>
        isEmpty(difference(decimalToDigit[4].split(''), digit.split(''))),
      );
      digitToDecimal[orderDigits(decimalToDigit[9])] = '9';

      // 0

      decimalToDigit[0] = sixSegmentsDigits.find(
        digit => !digitToDecimal[orderDigits(digit)],
      );
      digitToDecimal[orderDigits(decimalToDigit[0])] = '0';

      // 2
      decimalToDigit[2] = inputDigits.find(
        digit => !digitToDecimal[orderDigits(digit)],
      );
      digitToDecimal[orderDigits(decimalToDigit[2])] = '2';

      return Number(
        outputDigits.map(digit => digitToDecimal[orderDigits(digit)]).join(''),
      );
    }),
  );
