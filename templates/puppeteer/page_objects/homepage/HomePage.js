import AbstractPage from '../base/AbstractPage';
import selectors from './HomePage-po';

export default class HomePage extends AbstractPage {
  constructor() {
    super();
    this.pagePath = '/resources/models/3d-models/';

    this.selectors = selectors;
  }
}
