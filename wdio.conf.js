import { mkdirSync } from 'node:fs'; //temporary
import { ReportAggregator } from '@wdio/html-reporter';
let reportAggregator;

export const config = {
    runner: 'local',
    specs: ['./src/specs/**/*.spec.js'],
    maxInstances: 1,
    capabilities: [
        {
            browserName: 'chrome',
            'goog:chromeOptions': {
                args: [
                    '--disable-infobars',
                    '--disable-gpu',
                    '--headless=new',
                    '--disable-blink-features=AutomationControlled',
                    '--no-sandbox',
                    '--disable-dev-shm-usage',
                    '--window-size=1920,1080',
                ],
                excludeSwitches: ['enable-automation'],
                prefs: {
                    credentials_enable_service: false, // this will disable the password manager
                    'profile.password_manager_enabled': false,
                    'profile.password_manager_leak_detection': false,
                    'autofill.profile_enabled': false,
                    'autofill.credit_card_enabled': false,
                    'profile.default_content_setting_values.notifications': 2,
                },
            },
        },
    ],

    logLevel: 'error',
    bail: 0,
    baseUrl: 'https://practicesoftwaretesting.com',
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    framework: 'mocha',
    reporters: [
        [
            'spec',
            {
                showPreface: false, // Hides the reporter's introductory information in the terminal.
                symbols: {
                    passed: '[PASS]',
                    failed: '[FAIL]',
                },
            },
        ],

        [
            'html',
            {
                outputDir: './reports/html-reports/',
                filename: 'report.html',
                reportTitle: 'Test Report for Practice Software Testing',
                useOnAfterCommandForScreenshot: false,
            },
        ],
    ],

    onPrepare: function (_config, _capabilities) {
        reportAggregator = new ReportAggregator({
            outputDir: './reports/html-reports/',
            filename: 'master-report.html',
            reportTitle: 'Master Report',
            linkScreenshots: true,
            collapseTests: true,
            showInBrowser: true,
        });
        reportAggregator.clean();
    },

    onComplete: async function () {
        await reportAggregator.createReport();
    },
    afterTest: async function (test, context, { error }) {
        if (error) {
            mkdirSync('./reports/screenshots', { recursive: true });
            await browser.saveScreenshot(
                `./reports/screenshots/${test.title.replace(/\W+/g, '_')}.png`
            );
        }
    },
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000,
    },
};
