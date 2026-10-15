import { elementHelper } from '../utils/elementHelper.js';

class ProductCard {
    constructor(element) {
        this.element = element;
    }

    get name() { return this.element.$('[data-test="product-name"]'); }
    get price() { return this.element.$('[data-test="product-price"]'); }

    async getName() {
        return this.name.getText();
    }
    async getPrice() {
        const text = await this.price.getText();
        return parseFloat(text.replace(/[^\d.]/g, ''));
    }
    async getLink() {
        return this.element.getAttribute('href');
    }
    async open() {
        await elementHelper.waitAndClick(this.name);
    }
}

export default ProductCard;
