#!/usr/bin/env node

const program = require('commander');
const chalk = require('chalk');

program
  .version(require('../package').version, '-v, --version')
  .command('init')
  .alias('i')
  .description('Run setup for Puppeteer or Protractor')
  .action(() => {
    require('./setup');
  });

program.on('command:*', () => {
  console.log(chalk.red('Invalid command: %s\nSee --help for a list of available commands.', program.args.join(' ')))
  process.exit(1);
});

program.parse(process.argv);

if (process.argv.length === 2) {
  console.log(chalk.red('Missing command!\nSee --help for a list of available commands.'));
  program.outputHelp();
  return;
}