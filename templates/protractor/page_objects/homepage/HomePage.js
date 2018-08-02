import AbstractPage from '../base/AbstractPage';

export default class HomePage extends AbstractPage {
  constructor() {
    super();
    this.offerBanner = element(by.css('.offer-banner'));
    this.logOutButton = element(by.css('.logout'));
  }

  clickBanner() {
    this.offerBanner.click();
  }

  logoutUser() {
    this.logOutButton.click();
  }
}
