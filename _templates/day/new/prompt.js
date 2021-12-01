const process = require('process');

module.exports = {
  prompt: ({ prompter }) => {
    return new Promise(resolve => {
      if (process.argv.includes('--day')) {
        return resolve({
          day: process.argv[process.argv.indexOf('--day') + 1].padStart(2, '0'),
        });
      }

      prompter
        .prompt([
          {
            type: 'input',
            name: 'day',
            message: 'Which day should we add?',
            initial: `${new Date().getDate()}`.padStart(2, '0'),
          },
        ])
        .then(({ day }) => {
          resolve({ day: day.padStart(2, '0') });
        });
    });
  },
};
