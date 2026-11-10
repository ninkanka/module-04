import BasePage from './base.page.js';
import { elementHelper } from '../utils/elementHelper.js';
import { PATHS } from '../utils/testData.js';

class ContactPage extends BasePage {
    get idContactNameInput() { return $('[data-test="first-name"]'); }
    get idContactLastNameInput() { return $('[data-test="last-name"]'); }
    get idContactEmailInput() { return $('[data-test="email"]'); }
    get idContactSubjectSelect() { return $('[data-test="subject"]'); }
    get idContactMessageTextarea() { return $('[data-test="message"]'); }
    get idContactSendButton() { return $('[data-test="contact-submit"]'); }
    get idContactConfirmation() { return $('//*[contains(text(), "Thanks for your message")]'); }
    
    async open() {
        await super.open(PATHS.contact);
    }

    async fillForm(data) {
        await elementHelper.waitAndSetValue(this.idContactNameInput, data.firstName);
        await elementHelper.waitAndSetValue(this.idContactLastNameInput, data.lastName);
        await elementHelper.waitAndSetValue(this.idContactEmailInput, data.email);
        await this.idContactSubjectSelect.selectByVisibleText(data.subject);
        await elementHelper.waitAndSetValue(this.idContactMessageTextarea, data.message);
    }

    async send() {
        await elementHelper.waitAndClick(this.idContactSendButton);
    }

    async isConfirmationDisplayed() {
        return elementHelper.isDisplayed(this.idContactConfirmation, 10000);
    }
}

export default new ContactPage();
