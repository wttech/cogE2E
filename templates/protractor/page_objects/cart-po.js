const { toBeVisible, toBePresent, toBeClickable } = require('../helpers/wait');

const AbstractPage = require('../page_objects/abstract-po.js');
const envData = require('../data/env.json');

const Cart = function() {
	this.__proto__ = AbstractPage;

	this.pagePath = '/au/en';

	this.elements = {
		registerButton: element(by.css('.container-header-navigation-wrapper .js-toggle-cart')),
		sxDialogWrapper: element(by.css('.overlay-wrapper')),
		sxDialog: element(by.css('.overlay-wrapper > .overlay.component')),
		sxDialogCloseButton: element(by.css('.overlay-close')),
		addToCartButtons: element.all(by.css('.add-to-cart-enabled.is-enabled')),
		cartOverlay: element(by.css('.register-partial')),
		cartItems: element(by.css('.cart-items-list')),
		cartCloseButton: element(by.css('.js-toggle-cart.button-close-cart')),
		cartContinueButton: element(by.css('.register-partial .create-cookie.continue-cart-process')),
	};

	this.checkRegisterButtonPresence = function() {
		toBeVisible(this.elements.registerButton, 'Register button', 'medium');
		return this.elements.registerButton.isPresent();
	};
	this.checkSxDialogPresence = function() {
		toBePresent(this.elements.sxDialogWrapper, 'Dialog Wrapper from SX', 'medium');
		return this.elements.sxDialogWrapper.isPresent();
	};

	this.checkSxDialogDisplay = function() {
		toBeVisible(this.elements.sxDialog, 'Dialog from SX', 'medium');
		return this.elements.sxDialog.isDisplayed();
	};

	this.openCartOverlay = function() {
		browser.executeScript('arguments[0].click();', this.elements.registerButton.getWebElement());
		browser.driver.sleep(1000);
	};

	this.closeCartOverlay = function() {
		browser.driver.sleep(1000);
		browser.executeScript('arguments[0].click();', this.elements.cartCloseButton.getWebElement());
		browser.driver.sleep(1000);
	};

	this.closeSxDialog = function() {
		toBeVisible(this.elements.sxDialog, 'Dialog from SX', 'medium');
		toBeClickable(this.elements.sxDialogCloseButton, 'Close button', 'medium');
		this.elements.sxDialogCloseButton.click();
		browser.driver.sleep(1500);
		return this.elements.sxDialog.isDisplayed();
	};

	this.checkCartOverlayDisplay = function() {
		const cartOverlay = this.elements.cartOverlay;
		toBeVisible(cartOverlay, 'Cart overlay', 'medium');
		return cartOverlay.getAttribute('class');
	};

	this.getNumberOfItemsInCart = function() {
		const items = this.elements.cartItems.all(by.css('.cart-item'));
		return items.count();
	};
};

module.exports = new Cart();
