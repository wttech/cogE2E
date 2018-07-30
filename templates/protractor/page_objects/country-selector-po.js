const { toBeVisible, toBePresent } = require('../helpers/wait');

var AbstractPage = require('../page_objects/abstract-po.js');
var envData = require('../data/env.json');

var CountrySelector = function () {
  this.__proto__ = AbstractPage;

  this.pagePath = '/';

  this.elements = {
    jsCountrySelector: element(by.css('.country-selector-js')),
    countrySelectorTypeahead: element(by.css('.country-selector-typeahead')),
    countrySelectorOptionsList: element(by.css('.country-selector-options')),
    countrySelectorOptions: element.all(by.css('.country-selector-option')),
    countrySelectorValue: element(by.css('.country-selector-value')),
    getStartedButton: element(by.css('.country-selector-button-submit')),
    countrySelectors: element.all(by.css('.country-selector')),
    mobile: {
      countrySelectorValueMobile: element.all(by.css('.country-selector-value')).get(2),
      australiaMobile: element.all(by.css('li[data-link="' + envData.env[browser.params.env].URL + '/australia"]')).get(1),
      countryFlagsMobile: element.all(by.css('.country-selector-value span img'))
    }
  };

  this.checkJsSelectorPresence = function() {
    toBePresent(this.elements.jsCountrySelector, 'JS parsed country selector', 'long');
    return this.elements.jsCountrySelector.isPresent();
  };

  this.checkOptionListVisibility = function() {
    return this.elements.countrySelectorOptionsList.isDisplayed();
  };

  this.getButtonAttribute = function() {
    toBeVisible(this.elements.getStartedButton, 'Get Started button', 'long');
    return this.elements.getStartedButton.isEnabled();
  };

  this.checkCountrySelectorsVisibility = function() {
    toBeVisible(this.elements.countrySelectors.get(0), 'First country selector', 'long');
    return this.elements.countrySelectors.get(0).isPresent();
  };

  this.expandCountrySelectorDropdown = function() {
    toBeVisible(this.elements.countrySelectorValue, 'Dropdown shown', 'long');
    this.elements.countrySelectorValue.click();
  };

  this.closeDropdown = function() {
    this.elements.countrySelectorValue.click();
    toBeInvisible(this.elements.countryFlags, 'Country flags are not visible', 'long');
  };

  this.checkFlagsPresence = function() {
    return this.elements.countryFlags.isPresent();
  };

  this.chooseAustralia = function() {
    this.expandCountrySelectorDropdown();
    this.elements.australia.click();
    this.elements.getStartedButton.click();
    toBeVisible(this.elements.homeMenuItem, 'Home position in menu', 'long');
  };

  this.changeCountryForSingapore = function() {
    this.expandCountrySelectorDropdown();
    this.elements.singapore.click();
    toBeInvisible(this.elements.australia, 'Australia is not a chosen country', 'long');
  };

  this.chooseSriLanka = function() {
    this.expandCountrySelectorDropdown();
    this.elements.sriLanka.click();
    this.elements.getStartedButton.click();
    // Using waitForAngular here to make this one function work on both mobile and desktop. Waiting for element was working only on desktop.
    browser.waitForAngular();
  };

  // Functions for mobile resolutions

  this.expandCountrySelectorDropdownOnMobile = function() {
    toBeVisible(this.elements.mobile.countrySelectorValueMobile, 'Country selector value is visible', 'long');
    this.elements.mobile.countrySelectorValueMobile.click();
    toBeVisible(this.elements.mobile.australiaMobile, 'Dropdown is extended', 'long');
  };

  this.changeCountryForAustraliaOnMobile = function() {
    browser.driver.executeScript('window.scrollTo(0,600)');
    this.expandCountrySelectorDropdownOnMobile();
    this.elements.mobile.australiaMobile.click();
    toBeInvisible(this.elements.sriLanka, 'Chosen country is changed', 'long');
  };

  this.checkFlagsPresenceOnMobile = function() {
    return this.elements.mobile.countryFlagsMobile.isPresent();
  };
};

module.exports = new CountrySelector();
