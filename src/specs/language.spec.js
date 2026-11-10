import { assert } from 'chai';
import HomePage from '../pages/home.page.js';
import HeaderComponent from '../components/header.js';
import { LANGUAGES } from '../utils/testData.js';

describe('Feature: Language change', () => {

    LANGUAGES.forEach((lang) => {
        it(`Scenario Outline: User changes language to "${lang}"`, async () => {
            await HomePage.open();
            await HeaderComponent.changeLanguage(lang);

            const current = await HeaderComponent.currentLanguage();
            assert.equal(current, lang.toLowerCase(), 'page language should match the selected one');
        });
    });
});
