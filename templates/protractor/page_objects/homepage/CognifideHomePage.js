import AbstractPage from '../base/AbstractPage';
import NavigationComponent from './components/NavigationComponent';

export default class CognifideHomePage extends AbstractPage {
  constructor() {
    super();
    this.pagePath = 'http://www.cognifide.com/';
    this.navigationComponent = new NavigationComponent();
  }
}
