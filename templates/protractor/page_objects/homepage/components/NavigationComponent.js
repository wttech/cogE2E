import Wait from '../../../helpers/WaitHelper';
import Timeouts from '../../../constants/Timeouts';
import { selectors } from './NavigationComponentConstants'

export default class NavigationComponent {
  constructor() {
    this.menuButton = element(by.css(selectors.menuButton));
    this.menu = element(by.css(selectors.menu));
  }

  async openMenu() {
    await Wait.toBeVisible(this.menuButton, 'Navigation Menu', Timeouts.animations.short);
    this.menuButton.click();
    await Wait.toBeVisible(this.menu, 'Navigation Menu', Timeouts.animations.short);
  }

  async selectSubCategory(linkName) {
    const linkElement = element(by.css(`.field-navigationtitle a[title='${linkName}']`));
    await Wait.toBeVisible(linkElement, `Menu item: ${linkName}`, Timeouts.animations.short);
    linkElement.click();
  }

  async navigateToPage(linkName) {
    await this.openMenu();
    await this.selectSubCategory(linkName);
  }
}
