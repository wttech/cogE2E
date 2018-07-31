import envData from '../../data/env.json';
const puppeteer = require('puppeteer');

export default class AbstractPage {
  constructor() {
    this.domain = envData.env[global.envTest].URL;
    this.pagePath = '';
  }

  async init() {
    return await puppeteer.launch({
      ignoreHTTPSErrors: true,
      headless: false,
      args: ['--start-fullscreen']
    });
  }

  async open(browser) {
    const url = this.getFullUrl();
    const page = await browser.newPage();

    await page.goto(url);

    return page;
  }

  getDomain() {
    return this.domain;
  }

  getPagePath() {
    return this.pagePath;
  }

  getFullUrl() {
    return this.domain.concat(this.pagePath);
  }

  getTitle() {
    return browser.getTitle();
  }
}
