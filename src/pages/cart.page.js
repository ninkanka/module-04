import BasePage from './base.page.js';
import { elementHelper } from '../utils/elementHelper.js';
import { PATHS } from '../utils/testData.js';

class CartPage extends BasePage {
    get classCartItems() { return $$('[data-test="product-title"]'); }
    get classDeleteItemButtons() { return $$('a.btn.btn-danger'); }
    get idCartEmptyMessage() {
        return $('//p[normalize-space()="The cart is empty. Nothing to display."]');
    }

    async open() {
        await super.open(PATHS.cart);
    }

    async waitForItems() {
        await browser.waitUntil(
            async () => (await this.classCartItems).length > 0,
            { timeout: 10000, timeoutMsg: 'No products appeared in the shopping cart' }
        );
    }

    async itemNames() {
        await this.waitForItems();
        const items = await this.classCartItems;
        const names = [];
        for (const item of items) {
            names.push(await item.getText());
        }
        return names;
    }
    async itemCount() {
        return (await this.itemNames()).length;
    }
    async deleteFirstItem() {
        await this.waitForItems();
        const [firstButton] = await this.classDeleteItemButtons;
        await elementHelper.waitAndClick(firstButton);
    }
    async isEmpty() {
        return elementHelper.isDisplayed(this.idCartEmptyMessage);
    }
}

export default new CartPage();
