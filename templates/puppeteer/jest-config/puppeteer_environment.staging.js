const PuppeteerEnvironment = require('./puppeteer_environment.common');

class StagingEnv extends PuppeteerEnvironment {
  constructor(config) {
    super(config);
  }

  async setup() {
    await super.setup();
    this.global.envTest = 'staging';
  }
}

module.exports = StagingEnv;
