const { ExpectedConditions: until } = protractor;

const TIMEOUTS = {
    small: 5000,
    medium: 10000,
    long: 30000,
    veryLong: 60000,
    longest: 120000,
};

const constructErrorMessage = (name, timeout, toBeAction) => `Element "${name}" ${toBeAction} within ${Number(timeout) / 1000}s`;

const wait = (condition, name, toBeAction, timeout = 10000) => {
    const defaultTimeout = TIMEOUTS[timeout] || timeout;
    const msg = constructErrorMessage(name, defaultTimeout, toBeAction);
    return browser.wait(condition, defaultTimeout, msg);
}

/**
 * Waits until DOM node is clickable
 * @param node - DOM node
 * @param name - human readable name of the element
 * @param timeout - you can provide integer value (miliseconds), use one of the predefined values ('small', 'medium', 'long'). Defaults to 'medium' timeout equal to 10 seconds.
 * @returns promise
 */
const toBeClickable = (node, name, timeout) => wait(until.elementToBeClickable(node), name, 'was not clickable', timeout);

 /**
   * Waits until DOM element is present
   * @param element - DOM element
   * @param name - human readable name of the element
   * @param timeout - you can provide integer value (miliseconds), use one of the predefined values ('small', 'medium', 'long'). Defaults to 'medium' timeout equal to 10 seconds.
   * @returns promise
   */
const toBePresent = (node, name, timeout) => wait(until.presenceOf(node), name, 'was not present', timeout);

/**
  * Waits until DOM element is visible
  * @param element - DOM element
  * @param name - human readable name of the element
  * @param timeout - you can provide integer value (miliseconds), use one of the predefined values ('small', 'medium', 'long'). Defaults to 'medium' timeout equal to 10 seconds.
  * @returns promise
  */
const toBeVisible = (node, name, timeout) => wait(until.visibilityOf(node), name, 'was not visible', timeout);

/**
  * Waits until DOM element is invisible
  * @param element - DOM element
  * @param name - human readable name of the element
  * @param timeout - you can provide integer value (miliseconds), use one of the predefined values ('small', 'medium', 'long'). Defaults to 'medium' timeout equal to 10 seconds.
  * @returns promise
  */
const toBeInvisible = (node, name, timeout) => wait(until.invisibilityOf(node), name, 'was not invisible', timeout);

module.exports = {
    toBeClickable,
    toBePresent,
    toBeVisible,
    toBeInvisible,
}
