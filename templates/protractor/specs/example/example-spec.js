import CognifideHomePage from '../../page_objects/homepage/CognifideHomePage';
import BrowserLogs from '../../helpers/BrowserLogs';

describe('Confirm that home page works as expected', () => {
  const homepage = new CognifideHomePage();

  beforeAll(() => {
    homepage.openDesktop();
  });

  it('should open home page without errors', async () => {
    const logs = await BrowserLogs.grab();
    expect(logs.length).toEqual(0);
  });

  it('should be able to navigate to \'Our Work\'', async () => {
    await homepage.navigationComponent.navigateToPage('Our Work');
    expect(browser.getTitle()).toEqual('Our Work');
  });
});
