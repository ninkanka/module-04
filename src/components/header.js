import { elementHelper } from '../utils/elementHelper.js';

class HeaderComponent {
    get idLanguageDropdown() { return $('[data-test="language-select"]'); }
    get languageDropdownMenu() { return $('#dropdown-animated'); }
    languageOption(lang) {
        return $(`[data-test="lang-${lang.toLowerCase()}"]`);
    }

    get idUserMenuButton() { return $('[data-test="nav-menu"]'); }
    get idUserNameText() { return $('[data-test="nav-menu"]'); }
    get idSignOutLink() { return $('[data-test="nav-sign-out"]'); }
    get idSignInLink() { return $('[data-test="nav-sign-in"]'); }
    get idMyFavoritesLink() { return $('[data-test="nav-my-favorites"]'); }
    get idMyAccountLink() { return $('[data-test="nav-my-account"]'); }

    get idHomeLink() { return $('[data-test="nav-home"]'); }
    get idCategoriesButton() { return $('[data-test="nav-categories"]'); }
    get idMainMenuContact() { return $('[data-test="nav-contact"]'); }
    get idCartLink() { return $('[data-test="nav-cart"]'); }

    async changeLanguage(lang) {
        await elementHelper.waitAndClick(this.idLanguageDropdown);
        await this.languageDropdownMenu.waitForDisplayed();
        await elementHelper.waitAndClick(this.languageOption(lang));

        await browser.waitUntil(
            async () => (await this.currentLanguage()) === lang.toLowerCase(),
            { timeoutMsg: `Language was not changed to ${lang}` }
        );
    }

    async currentLanguage() {
        return browser.execute(() => document.documentElement.lang);
    }

    async openUserMenu() {
        await elementHelper.waitAndClick(this.idUserMenuButton);
    }

    async clickSignOut() {
        await elementHelper.waitAndClick(this.idSignOutLink);
    }

    async clickMyFavorites() {
        await elementHelper.waitAndClick(this.idMyFavoritesLink);
    }

    async clickMyAccount() {
        await elementHelper.waitAndClick(this.idMyAccountLink);
    }

    async openHome() {
        await elementHelper.waitAndClick(this.idHomeLink);
    }

    async openCategories() {
        await elementHelper.waitAndClick(this.idCategoriesButton);
    }

    async openContact() {
        await elementHelper.waitAndClick(this.idMainMenuContact);
    }

    async openCart() {
        await elementHelper.waitAndClick(this.idCartLink);
    }

    async isUserMenuDisplayed() {
        return elementHelper.isDisplayed(this.idUserNameText);
    }

    async signInLinkText() {
        return elementHelper.waitAndGetText(this.idSignInLink);
    }
}

export default new HeaderComponent();
