import HomePage from '../../page_objects/homepage/HomePage';

describe('Confirm that home page works as expected', () => {
  const homepage = new HomePage();

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
