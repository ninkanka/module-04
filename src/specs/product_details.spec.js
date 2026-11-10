import '../setup/chai.js';
import HomePage from '../pages/home.page.js';
import ProductPage from '../pages/product.page.js';
import { BUTTONS } from '../utils/testData.js';

describe('Feature: Actions with products', () => {

    it('Scenario: User reads product details page', async () => {
        // Given the user is on the home page / When the user clicks on a product card
        await HomePage.open();
        await HomePage.openFirstProduct();

        const details = await ProductPage.getDetails();
        details.title.should.not.be.empty;
        details.price.should.match(/\d/);
        details.image.should.be.true;
        details.specs.should.not.be.empty;
        details.description.should.not.be.empty;

        const buttons = await ProductPage.actionButtonsDisplayed([
            BUTTONS.addToCart,
            BUTTONS.addToFavorites,
            BUTTONS.compare
        ]);
        buttons.should.deep.equal([true, true, true]);
    });
});