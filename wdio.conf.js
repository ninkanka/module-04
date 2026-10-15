export const config = {    
    runner: 'local',    
    specs: [
        './src/specs/**/*.spec.js'
    ],      
    maxInstances: 1,    
    capabilities: [{
    browserName: 'chrome',
    'goog:chromeOptions': {
        prefs: {
            credentials_enable_service: false,
            'profile.password_manager_enabled': false,
            'profile.password_manager_leak_detection': false,
            'autofill.profile_enabled': false,
            'autofill.credit_card_enabled': false
        }
    }
}],

    logLevel: 'error',    
    bail: 0,
    baseUrl: 'https://practicesoftwaretesting.com',    
    waitforTimeout: 10000,    
    connectionRetryTimeout: 120000,   
    connectionRetryCount: 3,    
    framework: 'mocha',    
    reporters: ['spec'],
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    },

}
