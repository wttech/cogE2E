import Wait from '../../../helpers/WaitHelper';
import Timeouts from '../../../constants/Timeouts';
import { selectors } from './NavigationComponent.po'

export default class NavigationComponent {
  constructor() {
    this.menuButton = element(by.css(selectors.menuButton));
    this.menu = element(by.css(selectors.menu));
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
