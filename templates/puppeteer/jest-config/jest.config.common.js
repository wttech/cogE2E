const path = require('path');

module.exports = args => ({
    globalSetup: './jest-config/setup.js',
    globalTeardown: './jest-config/teardown.js',
    testEnvironment: `./jest-config/puppeteer_environment.${args.env}.js`,
    rootDir: path.join(__dirname, '..'),
    testMatch: ['**/specs/**/*.js'],
    transform: {
        '^.+\\.js$': './jest-config/jestBabelTransform.js'
    }
});
