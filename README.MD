# Module 4: WebdriverIO + Mocha + Chai

Automated tests for https://practicesoftwaretesting.com/ based on the Gherkin scenarios from Module 2.

## Run
How to run? 1. npm install 2. npm test

## Reporters
- Spec reporter is in terminal.
- HTML reportel is in folder reports and will open automatically OR after executing tests please use command `start reports\html-reports\master-report.html`
For HTMP report you need version Chrome 157 or higher!

## Notes
- Login failed: Account locked, too many failed attempts. In this case please use the another demo account (change data in USERS in the testData.js):
 ---** Email: `customer@practicesoftwaretesting.com` OR ---** Email: `customer3@practicesoftwaretesting.com`
 ---** Password: `welcome01`                         OR ---** Password `pass123`
- The features files are documentation only; they are not executed.
