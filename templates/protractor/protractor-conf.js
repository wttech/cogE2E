'use strict';
var HtmlScreenshotReporter = require('protractor-jasmine2-screenshot-reporter');
var SpecReporter = require('jasmine-spec-reporter').SpecReporter;
var JasmineReporter = require('jasmine-reporters');

var htmlReporter = new HtmlScreenshotReporter({
  captureOnlyFailedSpecs: true,
  dest: 'reports/html',
  userCss: [],
  cleanDestination: true,
  showSummary: true,
  showQuickLinks: true,
  reportTitle: '',
  showConfiguration: false
});
var specReporter = new SpecReporter({});
var jasmineReporter = new JasmineReporter.JUnitXmlReporter({
  consolidateAll: false,
  savePath: 'reports/junit'
});


exports.config = {
  framework: 'jasmine2',
  capabilities: {
    browserName: 'chrome',
    shardTestFiles: true,
    maxInstances: 1,
  },

  // Spec patterns are relative to the location of the spec file. They may
  // include glob patterns.
  suites: {},

  allScriptsTimeout: 1800000,
  // seleniumAddress: 'http://192.168.180.111:5555/wd/hub', //Bamboo remote selenium grid
  directConnect: true,
  // Options to be passed to Jasmine-node.
  jasmineNodeOpts: {
    showColors: true,
    isVerbose: true,
    //TODO: lower timeout (set to 120s to avoid timeout on large order test)
    defaultTimeoutInterval: 120000,
    includeStackTrace: true
  },

  // Setup the report before any tests start
  beforeLaunch: function () {
    return new Promise(function (resolve) {
      htmlReporter.beforeLaunch(resolve);
    });
  },
  // Close the report after all tests finish
  afterLaunch: function (exitCode) {
    return new Promise(function (resolve) {
      htmlReporter.afterLaunch(resolve.bind(this, exitCode));
    });
  },
  // // Assign the test reporter to each running instance
  onPrepare: function () {
    var env = jasmine.getEnv();
    env.addReporter(htmlReporter);
    env.addReporter(specReporter);
    env.addReporter(jasmineReporter);

    browser.manage().timeouts().pageLoadTimeout(120000);
    browser.ignoreSynchronization = true;
  },

  params: {
    env: 'cint'
  }
};
