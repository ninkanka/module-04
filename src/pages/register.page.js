import BasePage from './base.page.js';
import { elementHelper } from '../utils/elementHelper.js';
import { PATHS } from '../utils/testData.js';

class RegisterPage extends BasePage {
    get idRegisterFirstNameInput() { return $('[data-test="first-name"]'); }
    get idRegisterLastNameInput() { return $('[data-test="last-name"]'); }
    get idRegisterDobInput() { return $('[data-test="dob"]'); }
    get idRegisterStreetInput() { return $('[data-test="street"]'); }
    get idRegisterHouseNumberInput() { return $('[data-test="house_number"]'); }
    get idRegisterPostalCodeInput() { return $('[data-test="postal_code"]'); }
    get idRegisterCityInput() { return $('[data-test="city"]'); }
    get idRegisterStateInput() { return $('[data-test="state"]'); }
    get idRegisterCountrySelect() { return $('[data-test="country"]'); }
    get idRegisterPhoneInput() { return $('[data-test="phone"]'); }
    get idRegisterEmailInput() { return $('[data-test="email"]'); }
    get idRegisterPasswordInput() { return $('[data-test="password"]'); }
    get idRegisterButton() { return $('[data-test="register-submit"]'); }

    async open() {
        await super.open(PATHS.register);
    }
    async setDateOfBirth(value) {
        const input = await this.idRegisterDobInput;
        await input.waitForDisplayed();

        if ((await input.getAttribute('type')) === 'date') {
            await browser.execute((element, date) => {
                element.value = date;
                element.dispatchEvent(new Event('input', { bubbles: true }));
                element.dispatchEvent(new Event('change', { bubbles: true }));
            }, input, value);
        } else {
            await input.setValue(value);
            await browser.keys('Tab');
        }
    }

    async fillRegistrationForm(user) {
        await elementHelper.waitAndSetValue(this.idRegisterFirstNameInput, user.firstName);
        await elementHelper.waitAndSetValue(this.idRegisterLastNameInput, user.lastName);
        await this.setDateOfBirth(user.dateOfBirth);
        await elementHelper.waitAndSetValue(this.idRegisterStreetInput, user.street);
        await elementHelper.waitAndSetValue(this.idRegisterHouseNumberInput, user.houseNumber);
        await elementHelper.waitAndSetValue(this.idRegisterPostalCodeInput, user.postalCode);
        await elementHelper.waitAndSetValue(this.idRegisterCityInput, user.city);
        await elementHelper.waitAndSetValue(this.idRegisterStateInput, user.state);
        await this.idRegisterCountrySelect.selectByVisibleText(user.country);
        await elementHelper.waitAndSetValue(this.idRegisterPhoneInput, user.phone);
        await elementHelper.waitAndSetValue(this.idRegisterEmailInput, user.email);
        await elementHelper.waitAndSetValue(this.idRegisterPasswordInput, user.password);
    }

    async submitRegistration() {
        await elementHelper.waitAndClick(this.idRegisterButton);
    }
    async register(user) {
        await this.open();
        await this.fillRegistrationForm(user);
        await this.submitRegistration();
        await this.waitForRegistrationToFinish();
    }
    async waitForRegistrationToFinish() {
        try {
            await browser.waitUntil(
                async () => !(await browser.getUrl()).includes(PATHS.register),
                { timeout: 10000 }
            );
        } catch {
            const errors = await browser.execute(() =>
                Array.from(document.querySelectorAll('.alert-danger, .invalid-feedback, .text-danger'))
                    .map((element) => element.textContent.trim())
                    .filter(Boolean)
            );
            throw new Error(
                `Registration did not finish. URL: ${await browser.getUrl()}. Form errors: ${JSON.stringify(errors)}`
            );
        }
    }
}

export default new RegisterPage();
