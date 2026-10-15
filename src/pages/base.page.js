export default class BasePage {
        get idPageHeader() {
        return $('[data-test="nav-home"]');
    }

    async open(path = '/') {
        await browser.url(path);
        await this.idPageHeader.waitForDisplayed();
    }
}
