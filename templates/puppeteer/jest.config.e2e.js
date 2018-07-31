const configCommon = require('./jest.config.common.js');

module.exports = Object.assign(configCommon, {
    testMatch: ['**/specs/**/*.js?(x)', '**/?(*.)(spec.e2e).js?(x)'],
    transform: {
        '^.+\\.js$': './jestBabelTransform.js'
    }
});

