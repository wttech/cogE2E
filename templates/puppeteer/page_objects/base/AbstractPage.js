import envData from "../../data/env.json";

const puppeteer = require("puppeteer");

export default class AbstractPage {
  constructor() {
    this.domain = envData.env[global.envTest].URL;
    this.pagePath = "";
  }

  async init({
    args = ["--start-fullscreen"],
    ignoreHTTPSErrors = true,
    headless = true,
    slowMo = false
  }) {
    return await puppeteer.launch({
      args,
      ignoreHTTPSErrors,
      headless,
      slowMo
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
}
