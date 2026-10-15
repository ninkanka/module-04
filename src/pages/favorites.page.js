import BasePage from './base.page.js';
import { PATHS } from '../utils/testData.js';

class FavoritesPage extends BasePage {
    get productNameElements() { return $$('[data-test="product-name"]'); }

    async open() {
        await super.open(PATHS.favorites);
    }
    async favoriteNames() {
        const elements = await this.productNameElements;
        const names = [];
        for (const element of elements) {
            names.push(await element.getText());
        }
        return names;
    }
    async waitForFavorite(name) {
        const hasProduct = async () => (await this.favoriteNames()).includes(name);

        try {
            await browser.waitUntil(hasProduct, { timeout: 5000 });
        } catch {
            await browser.refresh();
            await browser.waitUntil(hasProduct, {
                timeout: 10000,
                timeoutMsg: `Product "${name}" was not found in the favorites list`,
            });
        }
    }
}

export default new FavoritesPage();
