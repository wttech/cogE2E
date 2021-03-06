const PuppeteerEnvironment = require('./puppeteer_environment.common');

class DevEnv extends PuppeteerEnvironment {
  constructor(config) {
    super(config);
  }

  async setup() {
    await super.setup();
    this.global.envTest = 'dev';
  }
}

module.exports = DevEnv;
