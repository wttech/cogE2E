export default class BrowserLogs {
  /**
   * Fetches browser logs
   * @returns promise
   */
  static async grab() {
    return browser.manage()
      .logs()
      .get('browser');
  }
}
