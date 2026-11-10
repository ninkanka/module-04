import '../setup/chai.js';
import HomePage from '../pages/home.page.js';
import HeaderComponent from '../components/header.js';
import ContactPage from '../pages/contact.page.js';
import { CONTACT } from '../utils/testData.js';

describe('Feature: Contact', () => {

    it('Scenario: Enter and send contact form', async () => {
        await HomePage.open();
        await HeaderComponent.openContact();
        await ContactPage.fillForm(CONTACT);
        await ContactPage.send();
        const confirmed = await ContactPage.isConfirmationDisplayed();
        confirmed.should.be.true;
    });
});