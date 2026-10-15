import BasePage from './base.page.js';
import { elementHelper } from '../utils/elementHelper.js';
import { PATHS } from '../utils/testData.js';

class LoginPage extends BasePage {    
    get idLoginEmailInput() { return $('[data-test="email"]'); }
    get idLoginPasswordInput() { return $('[data-test="password"]'); }
    get idLoginButton() { return $('[data-test="login-submit"]'); }
    get idRegisterLink() { return $('[data-test="register-link"]'); }
    get idLoginError() { return $('[data-test="login-error"]'); }

    async open() {
        await super.open(PATHS.login);
    }
    async login(email, password) {
        await elementHelper.waitAndSetValue(this.idLoginEmailInput, email);
        await elementHelper.waitAndSetValue(this.idLoginPasswordInput, password);
        await elementHelper.waitAndClick(this.idLoginButton);
        try {
            await browser.waitUntil(
                async () => (await browser.getUrl()).includes('/account'),
                { timeout: 10000 }
            );
        } catch {
            const reason = (await this.idLoginError.isExisting())
                ? await this.idLoginError.getText()
                : 'no error message on the page';
            throw new Error(`Login failed: ${reason} (URL: ${await browser.getUrl()})`);
        }
    }
    async clickRegisterLink() {
        await elementHelper.waitAndClick(this.idRegisterLink);
    }
}

export default new LoginPage();
