module.exports = [
  {
    type: 'list',
    name: 'tool',
    message: 'What tool do you need?',
    choices: ['Puppeteer', 'Protractor']
  },
  {
    type: 'confirm',
    name: 'packageAlready',
    message: `Do you have package.json file already?`
  }
];