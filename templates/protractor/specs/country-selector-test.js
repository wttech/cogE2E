const countrySelector = require('../page_objects/country-selector-po.js');
const envData = require('../data/env.json');

const countries = ['australia', 'sri lanka', 'singapore'];
const countriesHash = {
  'australia': 'au',
  'srilanka': 'lk',
  'singapore': 'sg',
}

describe('Country selector functionality tests', function () {

  /* Common tests (Country Selector with typeahead) */

  it('Should check if country selector got parsed', function() {
    countrySelector.open();
    expect(countrySelector.checkJsSelectorPresence()).toEqual(true);
  })

  it('Should check if get started button is disabled on enter', function() {
    expect(countrySelector.getButtonAttribute()).toEqual(false);
  })

  it('Should check if focusing typeahead expands options list', function() {
    expect(countrySelector.elements.countrySelectorTypeahead.isPresent()).toEqual(true);
    countrySelector.elements.countrySelectorTypeahead.click();
    expect(countrySelector.checkOptionListVisibility()).toEqual(true);
  })

  it('Should check if bluring typeahead collapses options list', function() {
    element(by.tagName('body')).click();
    expect(countrySelector.checkOptionListVisibility()).toEqual(false);
  })

  it('Should check if typing in input filters options list', function() {
    const testCases = 'bcdefghijklmnoprstowxyza'.split('');
    testCases.forEach(currCase => {
      countrySelector.elements.countrySelectorTypeahead.clear().sendKeys(currCase);
      const regexp = new RegExp('^'+currCase+'.+', "gi");
      const countries = countrySelector.elements.countrySelectorOptions
      countries.map(el => {
        expect(el.getText()).toMatch(regexp);
      });
    })
  })

  it('Should check if choosing option fills input with new value and flag', function() {
    const firstOption = countrySelector.elements.countrySelectorOptions.get(0)
    firstOption.getText().then(listedOptionText => {
      firstOption.click();
      const bgImgPromise = countrySelector.elements.countrySelectorTypeahead.getCssValue('background-image')
      const valuePromise = countrySelector.elements.countrySelectorTypeahead.getAttribute('value')

      Promise.all([bgImgPromise, valuePromise]).then(results => {
        const [bgImg, value] = results;

        expect(bgImg).not.toEqual('none');
        expect(listedOptionText).toEqual(value);
      })
    });
  })

  it('Should check if choosing correct option enables get started button', function() {
    expect(countrySelector.getButtonAttribute()).toEqual(true);
  })

  it('Should check if changing value of picked option disables get started button', function() {
    countrySelector.elements.countrySelectorTypeahead.clear().sendKeys('x');
    expect(countrySelector.getButtonAttribute()).toEqual(false);
  })

  it('Should check if hiting get started button redirects to proper page', function() {
    countries.forEach(country => {
      countrySelector.elements.countrySelectorTypeahead.clear().sendKeys(country);
      countrySelector.elements.countrySelectorOptions.get(0).click();
      countrySelector.elements.getStartedButton.click();
      const countryCode = countriesHash[country.replace(/\s/g, '')]
      expect(browser.getCurrentUrl()).toContain(envData.env[browser.params.env].URL + '/' + countryCode + '/en');
      browser.navigate().back();
    })
  })

  /* Common tests (Country selector in header) */

  it('Should check if country selector displays current country', function() {
    countries.forEach(country => {
      const countryWithoutWS = country.replace(/\s/g, '');
      const countryCode = countriesHash[countryWithoutWS];
      browser.get(`${envData.env[browser.params.env].URL}/${countryCode}/en`);
      countrySelector.checkCountrySelectorsVisibility();
      $$('.country-selector-value span').get(0).getText().then(text => {
        const normalizedText = text.toLowerCase().trim();
        expect(normalizedText).toEqual(country);
        browser.navigate().back();
      })
    })
  })

  it('Should check if country selector redirects to picked country', function() {
    countries.forEach(country => {
      const countryWithoutWS = country.replace(/\s/g, '');
      const countryCode = countriesHash[countryWithoutWS];
      browser.get(`${envData.env[browser.params.env].URL}/${countryCode}/en`);
      $$('.country-selector-value span').get(0).getText().then(text => {
        expect(text.toLowerCase()).toEqual(country);
        browser.navigate().back();
      })
    })
  })

  /* Accessibility tests */

  it('Should check if aria-expanded attribute toggles properly', function() {
    countrySelector.elements.jsCountrySelector.getAttribute('aria-expanded').then(expanded => {
      expect(expanded).toEqual('false');
      countrySelector.elements.countrySelectorTypeahead.click();
      countrySelector.elements.jsCountrySelector.getAttribute('aria-expanded').then(expanded => {
        expect(expanded).toEqual('true');
      })
    });
  })

  it('Should check if options list is navigable by arrow keys and choosable by hitting enter', function() {
    countrySelector.elements.countrySelectorTypeahead.click();
    countrySelector.elements.countrySelectorTypeahead.clear().sendKeys('australia');
    countrySelector.elements.countrySelectorTypeahead.sendKeys(protractor.Key.ARROW_DOWN);
    const optionTextPromise = countrySelector.elements.countrySelectorOptions.get(0).getText();
    countrySelector.elements.countrySelectorTypeahead.sendKeys(protractor.Key.ENTER);
    const typeaheadValuePromise = countrySelector.elements.countrySelectorTypeahead.getAttribute('value');

    Promise.all([optionTextPromise, typeaheadValuePromise]).then(results => {
      const [optionText, typeaheadValue] = results;
      expect(optionText.toLowerCase()).toEqual(typeaheadValue);
    })
  })

});
