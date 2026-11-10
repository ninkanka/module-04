import { assert } from 'chai';
import LoginPage from '../pages/login.page.js';
import RegisterPage from '../pages/register.page.js';
import HeaderComponent from '../components/header.js';
import { clearSession } from '../utils/sessionHelper.js';
import { PATHS, USERS } from '../utils/testData.js';

describe('Feature: User authentication', () => {
    beforeEach(async () => {
        await clearSession();
    });

    it('Scenario: User signs in with valid information', async () => {
        await LoginPage.open();
        await LoginPage.login(USERS.valid.email, USERS.valid.password);
        assert.isTrue(await HeaderComponent.isUserMenuDisplayed(), 'user menu should be visible after login');
    });

    it('Scenario: User signs up', async () => {
        await LoginPage.open();
        await LoginPage.clickRegisterLink();
        await RegisterPage.fillRegistrationForm(USERS.newUser);
        await RegisterPage.submitRegistration();
        await RegisterPage.waitForRegistrationToFinish();
        assert.notInclude(await browser.getUrl(), PATHS.register, 'user should leave the registration page after registration');
    });

    describe('Scenario: User signs out', () => {
        beforeEach(async () => {
            await LoginPage.open();
            await LoginPage.login(USERS.valid.email, USERS.valid.password);
        });

        it('shows "Sign in" instead of the username', async () => {
            await HeaderComponent.openUserMenu();
            await HeaderComponent.clickSignOut();
            assert.equal(await HeaderComponent.signInLinkText(), 'Sign in', 'header should show Sign in after logout');
        });
    });
});