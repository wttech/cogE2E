const NodeEnvironment = require('jest-environment-node');
const chalk = require('chalk');
const os = require('os');
const path = require('path');
const fs = require('fs');
const puppeteer = require('puppeteer');

class PuppeteerEnvironment extends NodeEnvironment {
  constructor(config) {
    super(config);
    this.DIR = path.join(os.tmpdir(), 'jest_puppeteer_global_setup');
  }

  async setup() {
    console.log(chalk.yellow('Setup Test Environment.'));

    const wsEndpoint = fs.readFileSync(path.join(this.DIR, 'wsEndpoint'), 'utf8');

    if (!wsEndpoint) {
      throw new Error('wsEndpoint not found');
    }

    await super.setup();

    this.global.__BROWSER__ = await puppeteer.connect({
      browserWSEndpoint: wsEndpoint,
    });
  }

  async teardown() {
    console.log(chalk.yellow('Teardown Test Environment.'));
    await super.teardown();
  }

  runScript(script) {
    return super.runScript(script);
  }
}

module.exports = PuppeteerEnvironment;
