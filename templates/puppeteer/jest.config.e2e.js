const configCommon = require('./jest.config.common.js');

module.exports = Object.assign(configCommon, {
    testMatch: ['**/?(*.)(spec.e2e).js?(x)'],
});

