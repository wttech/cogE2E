import HomePage from '../../page_objects/homepage/HomePage';

describe('Confirm that home page works as expected', () => {
  const homepage = new HomePage();
  const selectors = homepage.selectors;

  let page;
  let browser;

  beforeEach( async () => {
    browser = await homepage.init({
      headless: false
    });
  });

  test('opens', async () => {
      page = await homepage.open(browser);
  });

  afterAll(async () => {
      await browser.close();
  });
});
