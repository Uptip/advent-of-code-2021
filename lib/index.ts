import Enquirer from 'enquirer';
import process from 'process';
import { run } from './utils';

const launch = async () => {
  let day = '';

  if (process.argv.includes('--day')) {
    day = process.argv[process.argv.indexOf('--day') + 1].padStart(2, '0');
  } else {
    const response: { day: string } = await Enquirer.prompt({
      type: 'input',
      name: 'day',
      message: 'Which day should we launch?',
      initial: `${new Date().getDate()}`.padStart(2, '0'),
    });

    day = (response.day || '').padStart(2, '0');
  }

  try {
    const { formatInput, partOne, partTwo } = require(`../src/${day}/index.ts`);

    if (process.env.NODE_ENV !== 'test') {
      run({
        pathToInput: `${day}/input.txt`,
        partOne,
        partTwo,
        formatInput,
      });
    }
  } catch (err) {
    if (err.code === 'MODULE_NOT_FOUND') {
      console.log(``);
      console.log(`⚠️  \x1b[31mNo files exist for day ${day}.\x1b[0m`);
      console.log(
        `   Try running \x1b[34myarn generate\x1b[0m, and start again`,
      );
    }
  }
};

launch();
