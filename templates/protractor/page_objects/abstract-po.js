'use strict';

var envData = require('../data/env.json');

var AbstractPage = function () {

    var domain = envData.env[browser.params.env].URL;
    var width = 360;
    var height = 640;

    this.pagePath = '';

    this.open = function () {
        var url = this.getFullUrl();
        browser.driver.manage().window().maximize();
        browser.get(url);
        return this;
    };

    this.openMobileView = function () {
      var url = this.getFullUrl();
      browser.driver.manage().window().setSize(width, height);
      browser.get(url);
      return this;
    };

    this.getDomain = function () {
        return domain;
    };

    this.getPagePath = function () {
        return this.pagePath;
    };

    this.getFullUrl = function () {
        return domain + this.pagePath;
    };

    this.getTitle = function () {
        return browser.getTitle();
    };
};

module.exports = new AbstractPage();
