const { expect } = require('@playwright/test');
class AddtocartPage {
    constructor(page) {
        this.page = page;
        this.cartItems = page.locator("div li").first();
        this.productText = page.locator('.card-body b');
        this.cart = page.locator("[routerlink*='cart']");
        this.orders = page.locator("button[routerlink*='myorders']");
        this.checkoutButton = page.locator("text=Checkout");
    }

   async VerifyProductIsDisplayed(productName) {
       await this.cartItems.waitFor();
       const bool = await this.getProductLocator(productName).isVisible();
       expect(bool).toBeTruthy();
   }


   async checkout() {
    await this.checkoutButton.click();
   }

   getProductLocator(productName) {
    return this.page.locator(".cartSection h3:has-text('" + productName + "')");
   }
}  

module.exports = { AddtocartPage };