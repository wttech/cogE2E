import envData from "../../data/env.json";
import screens from "../../constants/Screens";

export default class AbstractPage {
  constructor() {
    this.domain = envData.env[browser.params.env].URL;
    this.pagePath = "";
  }

  openBrowser() {
    const url = this.getFullUrl();
    return browser.get(url);
  }

  async open(width, height) {
    browser.driver
      .manage()
      .window()
      .setSize(width, height);
    return this.openBrowser();
  }

  async openDesktop() {
    return this.open(screens.desktop.width, screens.desktop.height);
  }

  async openMobile() {
    return this.open(screens.mobile.width, screens.mobile.height);
  }

  async openTablet() {
    return this.open(screens.tablet.width, screens.tablet.height);
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

  addCookies(cookies) {
    return Promise.all(cookies.map(c => this.addCookie(c)));
  }

  addCookie(cookie) {
    return browser
      .manage()
      .addCookie({ name: cookie.name, value: cookie.value });
  }
}
