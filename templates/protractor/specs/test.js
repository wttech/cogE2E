'use strict';

var testPage = require('../page_objects/test-po.js');

describe('This is first test for protractor setup', function () {

  it('should test if setup works as expected', function () {
    testPage.open();
    testPage.clickOnHowToApplyLink();
    expect(browser.getCurrentUrl()).toContain('/uk-visa/how-to-apply');
  });
});
