const {Given, When, Then} = require('@cucumber/cucumber');
const { POManager } = require('../../pageobjects/POManager');
const { expect} = require('@playwright/test');
const playwright = require('playwright');

  Given('A login to Ecommerce website {string} and {string}', async function (username, password) {
            //chrome - plugins/ cookies
            const loginPage = this.poManager.getLoginPage();
            await loginPage.goTo();
            await loginPage.validLogin(username, password);
         });

    When('Add {string} to the cart', async function (productName) {
           // Write code here that turns the phrase above into concrete actions
           this.dashboardPage = this.poManager.getDashboardPage();
           await this.dashboardPage.searchProductAddCart(productName);
           await this.dashboardPage.navigateToCart();
         });

    Then('Verify {string} is displayed in the cart', async function (productName) {
           // Write code here that turns the phrase above into concrete actions
           const addtocartPage = this.poManager.getAddtocartPage();
           await addtocartPage.VerifyProductIsDisplayed(productName);
           await addtocartPage.checkout();
         });

    When('Place the order with {string} as country', {timeout: 100000},async function (countryName) {
           // Write code here that turns the phrase above into concrete actions
           const ordersReviewPage = this.poManager.getOrdersReviewPage();
           await ordersReviewPage.searchCountryAndSelect("ind", countryName);
           this.orderID = await ordersReviewPage.SubmitAndGetOrderID();
           console.log(this.orderID);
          
         });

    Then('Verify the order is present in Orders History', async function () {
           // Write code here that turns the phrase above into concrete actions
            await this.dashboardPage.navigateToOrders();
           const orderHistoryPage = this.poManager.getOrderHistoryPage();
           await orderHistoryPage.searchOrderAndSelect(this.orderID);
           expect(this.orderID.includes(await orderHistoryPage.getOrderID())).toBeTruthy();
         });

     Given('A login to Ecommerce2 website {string} and {string}', async function (username, password) {
             const userName = this.page.locator('#user-name');
             const signIn = this.page.locator('#login-button');
             await this.page.goto('https://www.saucedemo.com/'); //navigating to saucedemo.com
             console.log(await this.page.title());
             await userName.fill(username); //filling the username field
             await this.page.locator("[type='password']").fill(password); //filling the password field
             await signIn.click(); //clicking the login button
         });

     Then('Verify an error message is displayed', async function () {
           console.log(await this.page.locator('div.error-message-container').textContent());
           await expect(this.page.locator('div.error-message-container')).toContainText('Username'); //asserting the error message
         });