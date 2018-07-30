const cart = require('../page_objects/cart-po.js');
const EC = protractor.ExpectedConditions;

var selectedButtonId;

describe('Cart functionality tests', function() {

	it('Should check if cart button is visible', function() {
		cart.open();
		expect(cart.checkRegisterButtonPresence()).toEqual(true);
	});

	it(
		'Should check if dialog from SX is added to markup',
		function () {
			expect(cart.checkSxDialogPresence()).toEqual(true);
		});

	it('Should check if cart button is visible after click on the register button without added item',
		function () {
			cart.elements.registerButton.click();
			expect(cart.checkSxDialogDisplay()).toEqual(true);
		});

	it('Should check if clicking on close button closes SX Dialog', function() {
		expect(cart.closeSxDialog()).toEqual(false);
	});

	it('Should check if adding item to cart changes number in register button', function() {
		browser.refresh();
		const registerButton = cart.elements.registerButton;
		const itemCounter = registerButton.element(by.tagName('span'));
		cart.elements.addToCartButtons.get(0).getAttribute('data-id').then((value) => {
			selectedButtonId = value;
		});
		cart.elements.addToCartButtons.get(0).click();
		expect(browser.wait(EC.textToBePresentInElement(itemCounter, '1'), 10000)).toEqual(true);
	});

	it('Should check if added item makes button disabled', function () {
		$$(`.add-to-cart-enabled[data-id="${selectedButtonId}"]`).getAttribute('aria-disabled').then((value) => {
			expect(value).toEqual(['true']);
		});
	});

	it('Should check if cart overlay is displayed', function() {
		// click from protractor throws an error
		cart.openCartOverlay();
		expect(cart.checkCartOverlayDisplay()).toContain('is-visible');
	});

	it('Should check if clicking on close button closes cart overlay', function() {
		cart.closeCartOverlay();
		expect(cart.checkCartOverlayDisplay()).not.toContain('is-visible');
	});

	it('Should check if there is a single item in cart overlay', function() {
		cart.openCartOverlay();
		expect(cart.getNumberOfItemsInCart()).toBe(1);
	});

	it('Should check if an item disappears after clicking on remove', function() {
		const firstItem = cart.elements.cartItems.all(by.css('.cart-item .cart-item-remove')).get(0);
		firstItem.click();
		browser.driver.sleep(1000);
		expect(cart.getNumberOfItemsInCart()).toBe(0);
	});

	it('Should check if clicking on the Continue button opens SX dialog', function() {
		cart.elements.cartContinueButton.click();
		expect(cart.checkSxDialogDisplay()).toEqual(true);
	});
});