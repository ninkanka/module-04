import { expect } from 'chai';
import HomePage from '../pages/home.page.js';
import ProductPage from '../pages/product.page.js';
import FilterSidebar from '../components/filter-sidebar.js';
import { FILTERS, SORT } from '../utils/testData.js';

describe('Feature: Actions with products', () => {
    beforeEach(async () => {
        await HomePage.open();
    });

    FILTERS.forEach(({ category, brand }) => {
        it(`Scenario Outline: User filters products by "${category}" and "${brand}"`, async () => {
            await HomePage.waitForListUpdate(() => FilterSidebar.selectFilter(category));
            await HomePage.waitForListUpdate(() => FilterSidebar.selectFilter(brand));
            const links = await HomePage.productLinks();
            expect(links, 'filtered list should not be empty').to.not.be.empty;

            for (const link of links) {
                await ProductPage.open(link);
                expect(await ProductPage.getBrand()).to.equal(brand);
            }
        });
    });

    it('Scenario: User filters and sorts products', async () => {
        await HomePage.waitForListUpdate(() => FilterSidebar.selectFilter(SORT.category));
        await HomePage.waitForListUpdate(() => FilterSidebar.sortBy(SORT.option));
        const prices = await HomePage.productPrices();
        expect(prices, 'list should not be empty').to.not.be.empty;
        expect(prices).to.deep.equal([...prices].sort((a, b) => a - b));
    });
});
