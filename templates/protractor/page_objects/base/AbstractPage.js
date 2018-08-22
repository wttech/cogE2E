import envData from '../../data/env.json';

export default class AbstractPage {
  constructor() {
    this.domain = envData.env[browser.params.env].URL;
    this.pagePath = '';
  }

  async open() {
    const url = this.getFullUrl();
    return browser.get(url);
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
    return browser.manage().addCookie({ name: cookie.name, value: cookie.value });
  }
}
