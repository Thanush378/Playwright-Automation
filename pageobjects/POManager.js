const { LoginPage } = require('./LoginPage');
const { DashboardPage } = require('./DashBoardPage');
const { AddtocartPage } = require('./AddtocartPage');
const { OrdersReviewPage } = require('./OrdersReviewPage');
const { OrderHistoryPage } = require('./OrderHistoryPage');
const { get } = require('node:http');

class POManager {
    constructor(page){
        this.page = page;
         this.loginPage = new LoginPage(this.page);
         this.dashboardPage = new DashboardPage(this.page);
         this.addtocartPage = new AddtocartPage(this.page);
         this.ordersReviewPage = new OrdersReviewPage(this.page);
         this.orderHistoryPage = new OrderHistoryPage(this.page);
    }

getLoginPage() {
    return this.loginPage;
}

getDashboardPage(){
    return this.dashboardPage;
}

getAddtocartPage(){
    return this.addtocartPage;
}
getOrdersReviewPage() {
    return this.ordersReviewPage;
}

getOrderHistoryPage() {
    return this.orderHistoryPage;
}
}

module.exports = {POManager};