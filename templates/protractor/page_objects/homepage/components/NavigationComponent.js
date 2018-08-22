import Wait from '../../../helpers/WaitHelper';
import Timeouts from '../../../constants/Timeouts';

export default class NavigationComponent {
  constructor() {
    this.menuButton = element(by.css('.component.plain-html.menu-handler .component-content'));
    this.menu = element(by.css('.component.navigation.navigation-mobile.initialized'));
  }

  async openMenu() {
    this.menuButton.click();
    await Wait.toBeVisible(this.menu, 'Navigation Menu', Timeouts.animations.short);
  }

  async selectSubCategory(linkName) {
    const linkElement = element(by.css(`.field-navigationtitle a[title='${linkName}']`));
    await Wait.toBeVisible(linkElement, `Menu item: ${linkName}`, Timeouts.animations.short);
    await linkElement.click();
  }

  async navigateToPage(linkName) {
    await this.openMenu();
    await this.selectSubCategory(linkName);
  }
}
