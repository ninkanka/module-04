import { expect } from 'chai';
import HomePage from '../pages/home.page.js';
import ProductPage from '../pages/product.page.js';
import CartPage from '../pages/cart.page.js';
import HeaderComponent from '../components/header.js';
import { clearSession } from '../utils/sessionHelper.js';

describe('Feature: Shopping cart actions', () => {
    beforeEach(async () => {
        await clearSession();
    });

    it('Scenario: Add product to the shopping cart', async () => {
        await HomePage.open();
        await HomePage.openFirstProduct();
        const title = await ProductPage.getTitle();
        await ProductPage.addToCart();
        await HeaderComponent.openCart();
        const names = await CartPage.itemNames();
        expect(names.join(' ')).to.include(title);
    });

    describe('Scenario: Delete a product from the shopping cart', () => {
        beforeEach(async () => {
            await HomePage.open();
            await HomePage.openFirstProduct();
            await ProductPage.addToCart();
            await HeaderComponent.openCart();
        });

        it('deletes the product and shows an empty cart', async () => {
            expect(await CartPage.itemCount()).to.be.above(0);
            await CartPage.deleteFirstItem();
            expect(await CartPage.isEmpty()).to.be.true;
        });
    });
});
