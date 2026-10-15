import BasePage from './base.page.js';
import ProductCard from '../components/product_card.js';
import { PATHS } from '../utils/testData.js';

const CARD = 'a.card[data-test^="product-"]';

class HomePage extends BasePage {
    get searchInput() { return $('[data-test="search-query"]'); }
    get searchButton() { return $('[data-test="search-submit"]'); }
    get productCards() { return $$(CARD); }

    async open() {
        await super.open(PATHS.home);
    }
    async searchFor(term) {
        await this.searchInput.setValue(term);
        await this.searchButton.click();
        await browser.waitUntil(
            async () => {
                const names = await this.productNames();
                return names.length > 0 &&
                    names.every((name) => name.toLowerCase().includes(term.toLowerCase()));
            },
            { timeout: 10000, timeoutMsg: `Product "${term}" was not found` }
        );
    }
    async waitForProducts() {
        await browser.waitUntil(
            async () => (await this.productCards).length > 0,
            { timeout: 10000, timeoutMsg: 'Product cards did not appear' }
        );
    }
    async cards() {
        await this.waitForProducts();
        const elements = await this.productCards;
        return elements.map((element) => new ProductCard(element));
    }
    async productCount() {
        return (await this.cards()).length;
    }    
    async productNames() {
        await this.waitForProducts();
        return browser.execute(() =>
            Array.from(document.querySelectorAll('[data-test="product-name"]'))
                .map((element) => element.textContent.trim())
        );
    }
    async productPrices() {
        const products = await this.cards();
        return Promise.all(products.map((product) => product.getPrice()));
    }
    async productLinks() {
        const products = await this.cards();
        return Promise.all(products.map((product) => product.getLink()));
    }
    async openFirstProduct() {
        const [first] = await this.cards();
        await first.open();
    }
    async waitForListUpdate(action) {
        const before = (await this.productNames()).join('|');
        await action();
        try {
            await browser.waitUntil(
                async () => (await this.productNames()).join('|') !== before,
                { timeout: 5000 }
            );
        } catch {
        }
    }
}

export default new HomePage();
