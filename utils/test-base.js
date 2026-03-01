const base = require('@playwright/test');


exports.customtest = base.test.extend({
    // Add any test fixtures or overrides here
    testDataForOrder : {
        username: "svthanush01@gmail.com",
        password: "TEstSite@@123#$",
        productName: "ZARA COAT 3"
    }
});