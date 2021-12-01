const process = require('process');

module.exports = {
  prompt: ({ prompter }) => {
    return new Promise(resolve => {
      if (process.argv.includes('--day') && process.argv.includes('--stars')) {
        return resolve({
          day: process.argv[process.argv.indexOf('--day') + 1].padStart(2, '0'),
          stars: Number(process.argv[process.argv.indexOf('--stars') + 1]),
        });
      }

      prompter
        .prompt([
          {
            type: 'input',
            name: 'day',
            message: 'Which day did you complete?',
            initial: `${new Date().getDate()}`.padStart(2, '0'),
          },
          {
            type: 'input',
            name: 'stars',
            message: 'How many stars did you get?',
            initial: 2,
          },
        ])
        .then(({ day, stars }) => {
          resolve({
            day: day.padStart(2, '0'),
            stars: parseInt(stars),
          });
        });
    });
  },
};
