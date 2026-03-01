// @ts-check
const { devices, expect } = require('@playwright/test');
const { time } = require('node:console');
const { report } = require('node:process');
const { retries } = require('./playwright.config1');

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config ={
  testDir: './tests',
  retries: 2,
  timeout: 30 * 1000, // Set a timeout of 30 seconds for each test
  expect: {
    timeout: 5000 // Set a timeout of 5 seconds for expect assertions
  },
  reporter: 'html', // Use HTML reporter to generate test reports
  use: {
    browserName: 'chromium', // Use Chromium browser for testing
    headless: true, // Run tests in headed mode (not headless)
    screenshot: "on", // Take a screenshot on test failure
    trace: "retain-on-failure", //(on, off) // Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer
  },


};

module.exports = config;