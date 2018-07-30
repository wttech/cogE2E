import LiveHomePage from '../../page_objects/live/homepage/LiveHomePage';

const EC = protractor.ExpectedConditions;
describe('Confirm that home page works as expected', () => {
  const homepage = new LiveHomePage();

  beforeEach(() => {
    homepage.open();
  });

  it('should open home page without errors', (done) => {
    homepage.getDomain();

    browser.manage()
      .logs()
      .get('browser')
      .then((browserLog) => {
        expect(browserLog.length).toEqual(0);
      })
      .then(done);
  });
});
