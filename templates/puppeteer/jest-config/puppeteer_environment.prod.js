const PuppeteerEnvironment = require('./puppeteer_environment.common');

class LocalEnv extends PuppeteerEnvironment {
    constructor(config) {
        super(config);
    }

    async setup() {
        await super.setup();
        this.global.envTest = 'prod';
    }
}

module.exports = LocalEnv;