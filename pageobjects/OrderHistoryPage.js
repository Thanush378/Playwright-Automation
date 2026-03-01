class OrderHistoryPage {
    constructor(page) {
        this.page = page;
        this.ordersTable = page.locator("tbody");
        this.rows = page.locator("tbody tr");
        this.orderDetails = page.locator(".col-text");
    }
    async searchOrderAndSelect(orderID) {
        await this.ordersTable.waitFor();
        for (let i=0; i<await this.rows.count(); i++) {
            const rowOrderID = await this.rows.nth(i).locator("th").textContent();
           if(orderID.includes(rowOrderID)) {
              await this.rows.nth(i).locator("button").first().click();
              break;
           } 
          } 
    }



    async getOrderID(){
        return await this.orderDetails.textContent();
    }
}
module.exports = {OrderHistoryPage};
