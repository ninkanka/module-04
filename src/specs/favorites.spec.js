import '../setup/chai.js';
import HomePage from '../pages/home.page.js';
import ProductPage from '../pages/product.page.js';
import LoginPage from '../pages/login.page.js';
import HeaderComponent from '../components/header.js';
import FavoritesPage from '../pages/favorites.page.js';
import { USERS } from '../utils/testData.js';

describe('Feature: Favorite products', () => {

    beforeEach(async () => {
        await LoginPage.open();
        await LoginPage.login(USERS.valid.email, USERS.valid.password);
    });

    it('Scenario: Select favorite products', async () => {
        await HomePage.open();
        await HomePage.openFirstProduct();
        const title = await ProductPage.getTitle();
        await ProductPage.addToFavorites();
        await HeaderComponent.openUserMenu();
        await HeaderComponent.clickMyFavorites();
        await FavoritesPage.waitForFavorite(title);
        const names = await FavoritesPage.favoriteNames();
        names.should.include(title);
    });
});