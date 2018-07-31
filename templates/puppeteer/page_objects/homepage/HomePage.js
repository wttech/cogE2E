import AbstractPage from '../base/AbstractPage';
import selectors from './HomePage-po';

export default class HomePage extends AbstractPage {
  constructor() {
    super();
    this.pagePath = '';

    this.selectors = selectors;
  }
}
