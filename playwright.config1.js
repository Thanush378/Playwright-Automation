// @ts-check
const { devices, expect } = require('@playwright/test');
const { time } = require('node:console');
const { report } = require('node:process');

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config ={
  testDir: './tests',
  retries: 1, // Retry failed tests once to check the flakiness of the tests
  timeout: 30 * 1000, // Set a timeout of 30 seconds for each test
  expect: {
    timeout: 5000 // Set a timeout of 5 seconds for expect assertions
  },
  reporter: 'html',
  projects: [{
    name: 'Firefox', // Name of the project
    use: {
    browserName: 'firefox', // Use Firefox browser for testing
    headless: true, // Run tests in headless mode
    screenshot: "off", // Take a screenshot on test failure
    trace: "retain-on-failure", //(on, off) // Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer
  }
  },
  {
    name: 'Chrome', // Name of the project
    use: {
      browserName: 'chromium', // Use Chromium browser for testing
      headless: false, // Run tests in headless mode
      screenshot: "on", // Take a screenshot on test failure
      video: "retain-on-failure", // Record video when retrying the failed test.
      ignoreHTTPSErrors: true, // Ignore HTTPS errors in Chrome
      permissions: ['geolocation'], // Grant geolocation permissions in Chrome
      trace: "retain-on-failure", //(on, off) // Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer
    //  viewport: { width: 720, height: 720 }, // Set the viewport size for Chrome
    }
  }

] // Use HTML reporter to generate test reports


};

module.exports = config;



// Run tests in specific browsers : npx playwright test tests/clientAppPO.spec.js --config playwright.config1.js --project=Chrome 
// Run tests in all browsers : npx playwright test tests/clientAppPO.spec.js --config playwright.config1.js


// If you want to run the tests in a specific devices (Example in mobile devices), you can use the following:
// projects: [
//   {
//     name: 'Mobile Chrome', // Name of the project
//     use: {
//       ...devices['Pixel 5'], // Use the device configuration for Pixel 5 or can select any other device from the devices list provided by Playwright
//       headless: true, // Run tests in headless mode
//       screenshot: "on", // Take a screenshot on test failure
//       trace: "retain-on-failure", //(on, off) // Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer
//     }

// For allure reporting need to provide these following commands:
//npx playwright test --grep @Web --reporter=line,allure-playwright
// allure generate ./allure-results
//allure open ./allure-report
