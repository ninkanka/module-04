import BasePage from './base.page.js';
import { elementHelper } from '../utils/elementHelper.js';
import { BUTTONS } from '../utils/testData.js';

class ProductPage extends BasePage {
    get idProductTitle() { return $('[data-test="product-name"]'); }
    get idProductPrice() { return $('[data-test="unit-price"]'); }
    get idProductImage() {
        return $('app-detail > .row.my-3 .col-md-6:first-child .card-img-wrapper img');
    }
    get idProductSpecs() { return $('[data-test="specs-title"]'); }
    get idProductDescription() { return $('[data-test="product-description"]'); }
    get idProductBrand() { return $('[data-test="product-brand"], [aria-label="brand"]'); }
    get idCartQuantity() { return $('[data-test="cart-quantity"]'); }
    get addToFavoritesButton() { return $(`[data-test="${BUTTONS.addToFavorites}"]`); }
    actionButton(name) {
        return $(`[data-test="${name}"]`);
    }
    async getDetails() {
        return {
            title: await elementHelper.waitAndGetText(this.idProductTitle),
            price: await elementHelper.waitAndGetText(this.idProductPrice),
            image: await this.idProductImage.isDisplayed(),
            specs: await elementHelper.waitAndGetText(this.idProductSpecs),
            description: await elementHelper.waitAndGetText(this.idProductDescription),
        };
    }
    async getTitle() {
        return elementHelper.waitAndGetText(this.idProductTitle);
    }
    async getBrand() {
        return elementHelper.waitAndGetText(this.idProductBrand);
    }
    async actionButtonsDisplayed(names) {
        return Promise.all(
            names.map((name) => elementHelper.isDisplayed(this.actionButton(name)))
        );
    }
    async addToCart() {
        await elementHelper.waitAndClick(this.actionButton(BUTTONS.addToCart));
        await this.idCartQuantity.waitForDisplayed();
    }

    async addToFavorites() {
        await elementHelper.waitAndClick(this.addToFavoritesButton);
    }
}

export default new ProductPage();
