import { assert } from 'chai';
import HomePage from '../pages/home.page.js';
import { SEARCH_TERMS } from '../utils/testData.js';

describe('Feature: Actions with products', () => {
  
    beforeEach(async () => {
        await HomePage.open();
    });

    SEARCH_TERMS.forEach((term) => {
        it(`Scenario Outline: user search for an exact product "${term}"`, async () => {
            const fullCatalogCount = await HomePage.productCount();
            await HomePage.searchFor(term);
            const names = await HomePage.productNames();
            assert.isAbove(names.length, 0, 'search returned no products');
            assert.isBelow(names.length, fullCatalogCount, 'results should be fewer than full catalog');
            names.forEach((name) => {
                assert.include(name.toLowerCase(), term.toLowerCase());
            });
        });
    });
});