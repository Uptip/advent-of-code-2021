import { promises as fs } from 'fs';
import path from 'path';

export const loadFile = async fileName => {
  try {
    const data = await fs.readFile(
      path.join(__dirname, '..', 'src', fileName),
      'utf-8',
    );
    return data;
  } catch (err) {
    console.log('Error loading file');
  }
};

export const range = size => [...Array(size).keys()];

/* istanbul ignore next */
export const run = async ({
  pathToInput,
  formatInput,
  partOne,
  partTwo,
  comment,
}) => {
  const suffix = Boolean(comment) ? ` (${comment})` : ``;
  const fileContent = await loadFile(pathToInput);
  const input = formatInput(fileContent);

  console.time(`\x1b[2mTotal time${suffix}\x1b[0m`);

  console.time(`\x1b[2mPart one time${suffix}\x1b[0m`);
  console.log(``);
  console.log(`🎄 Answer one${suffix} is \x1b[32m`, partOne(input), '\x1b[0m');
  console.timeEnd(`\x1b[2mPart one time${suffix}\x1b[0m`);

  console.log(``);

  console.time(`\x1b[2mPart two time${suffix}\x1b[0m`);
  console.log(`🎄 Answer two${suffix} is \x1b[32m`, partTwo(input), '\x1b[0m');
  console.timeEnd(`\x1b[2mPart two time${suffix}\x1b[0m`);

  console.log(``);
  console.timeEnd(`\x1b[2mTotal time${suffix}\x1b[0m`);
  console.log(``);
};
