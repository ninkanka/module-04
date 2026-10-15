export const elementHelper = {
    async waitAndClick(element) {
        await element.waitForDisplayed();
        await element.click();
    },

    async waitAndSetValue(element, value) {
        await element.waitForDisplayed();
        await element.setValue(value);
    },

    async waitAndGetText(element) {
        await element.waitForDisplayed();
        return element.getText();
    },

    async isDisplayed(element, timeout = 5000) {
        try {
            await element.waitForDisplayed({ timeout });
            return true;
        } catch {
            return false;
        }
    },
};
