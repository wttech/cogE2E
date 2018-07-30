export default class Helpers {
  addCookie(page, cookie) {
    beforeEach((cb) => {
      page.open()
        .then(() => page.addCookies(cookie))
        .then(() => page.open())
        .then(cb);
    });
  }

  isUserSigned(page) {
    it('should not see "Sign in" button', () => {
      expect(browser.isElementPresent(page.signInButton)).toBe(false);
    });
  }
}
