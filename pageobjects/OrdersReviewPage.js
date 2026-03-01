const { expect } = require('@playwright/test');
class OrdersReviewPage {
    constructor(page) {
        this.page = page;
        this.country = page.locator("[placeholder*='Country']"); 
        this.dropdoown = page.locator(".ta-results");
        this.emailId = page.locator(".user__name [type='text']").first();
        this.suubmit = page.locator(".action__submit");
        this.orderConfirmationText = page.locator(".hero-primary");
        this.orderID = page.locator(".em-spacer-1 .ng-star-inserted");   
    }

    async searchCountryAndSelect(countryCode, countryName) {
        await this.country.pressSequentially(countryCode, {delay: 100});
        await this.dropdoown.waitFor();
        const optionsCount = await this.dropdoown.locator("button").count();
        for (let i=0; i < optionsCount; i++){
          const text = await this.dropdoown.locator("button").nth(i).textContent();
          if (text.trim() === countryName) {
            await this.dropdoown.locator("button").nth(i).click();
            break;
          }
        }
    }

    async VerifyEmailId(username) {
        await expect(this.emailId).toHaveText(username);
    }

    async SubmitAndGetOrderID() {
        await this.suubmit.click();
        await expect(this.orderConfirmationText).toHaveText("Thankyou for the order. ");
        return await this.orderID.textContent();
    }
}   
module.exports = {OrdersReviewPage};