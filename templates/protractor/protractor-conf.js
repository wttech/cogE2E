"use strict";

require("@babel/register");

const HtmlScreenshotReporter = require("protractor-jasmine2-screenshot-reporter");
const SpecReporter = require("jasmine-spec-reporter").SpecReporter;
const JasmineReporter = require("jasmine-reporters");

const htmlReporter = new HtmlScreenshotReporter({
  dest: "reports",
  userCss: [],
  cleanDestination: true,
  showSummary: true,
  showQuickLinks: true,
  reportTitle: "",
  showConfiguration: false
});

const specReporter = new SpecReporter();

const xunitReporter = new JasmineReporter.JUnitXmlReporter({
  consolidateAll: false,
  savePath: "reports/junit"
});

exports.config = {
  framework: "jasmine2",
  capabilities: {
    browserName: "chrome",
    shardTestFiles: true,
    maxInstances: 1,
    loggingPrefs: {
      driver: "WARNING",
      server: "WARNING",
      browser: "SEVERE"
    }
  },

  // Spec patterns are relative to the location of the spec file. They may
  // include glob patterns.
  suites: {
    homePage: "specs/example/**.js"
  },

  allScriptsTimeout: 1800000,
  // Options to be passed to Jasmine-node.
  jasmineNodeOpts: {
    showColors: true,
    isVerbose: true,
    defaultTimeoutInterval: 45000,
    includeStackTrace: true
  },

  // Setup the report before any tests start
  beforeLaunch: () =>
    new Promise(resolve => {
      htmlReporter.beforeLaunch(resolve);
    }),
  // Close the report after all tests finish
  afterLaunch: exitCode =>
    new Promise(resolve => {
      htmlReporter.afterLaunch(resolve.bind(this, exitCode));
    }),

  // // Assign the test reporter to each running instance
  onPrepare: function() {
    let env = jasmine.getEnv();
    env.clearReporters();
    env.addReporter(htmlReporter);
    env.addReporter(specReporter);
    env.addReporter(xunitReporter);

    browser
      .manage()
      .timeouts()
      .pageLoadTimeout(45000);
    browser.ignoreSynchronization = true;
  },

  params: {
    env: "live"
  }
};
