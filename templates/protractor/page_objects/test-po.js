'use strict';

var AbstractPage = require('../page_objects/abstract-po.js');

var TestPage = function () {
  this.__proto__ = AbstractPage;

  this.pagePath = '/';

  this.elements = {
    howToApplyLink: element.all(by.css('div.component.link.col-xs-12 div div a')).get(1)
  };

  this.clickOnHowToApplyLink = function() {
    browser.sleep(5000);
    this.elements.howToApplyLink.click();
    browser.sleep(3000);
  };
};

module.exports = new TestPage();
