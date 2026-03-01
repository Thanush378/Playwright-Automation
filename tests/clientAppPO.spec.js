const {test, expect} = require('@playwright/test');
const {customtest} = require('../utils/test-base');
const { POManager } = require('../pageobjects/POManager');
//JSON-->String-> object
const dataSet = JSON.parse(JSON.stringify(require('../utils/placeorderTestData.json')));

for (const data of dataSet) {

test(`@Web Client APP login for ${data.productName}`, async ({page}) => { //test case will run for each data set in the placeorderTestData.json file
  const poManager = new POManager(page);
  //chrome - plugins/ cookies
  const loginPage = poManager.getLoginPage();
  await loginPage.goTo();
  await loginPage.validLogin(data.username, data.password);

  const dashboardPage = poManager.getDashboardPage();
  await dashboardPage.searchProductAddCart(data.productName);
  await dashboardPage.navigateToCart();

  const addtocartPage = poManager.getAddtocartPage();
  await addtocartPage.VerifyProductIsDisplayed(data.productName);
  await addtocartPage.checkout();

  const ordersReviewPage = poManager.getOrdersReviewPage();
  await ordersReviewPage.searchCountryAndSelect("ind", "India");
  const orderID = await ordersReviewPage.SubmitAndGetOrderID();
  console.log(orderID);
  await dashboardPage.navigateToOrders();


  const orderHistoryPage = poManager.getOrderHistoryPage();
  await orderHistoryPage.searchOrderAndSelect(orderID);
  expect(orderID.includes(await orderHistoryPage.getOrderID())).toBeTruthy();
});
}

customtest(`Client APP login`, async ({page, testDataForOrder}) => {
  const poManager = new POManager(page);
  //chrome - plugins/ cookies
  const loginPage = poManager.getLoginPage();
  await loginPage.goTo();
  await loginPage.validLogin(testDataForOrder.username, testDataForOrder.password);

  const dashboardPage = poManager.getDashboardPage();
  await dashboardPage.searchProductAddCart(testDataForOrder.productName);
  await dashboardPage.navigateToCart();

  const addtocartPage = poManager.getAddtocartPage();
  await addtocartPage.VerifyProductIsDisplayed(testDataForOrder.productName);
  await addtocartPage.checkout();
});
// POM, test data (username, password) 
// SDET QA - Pavan



//test files will run in parallel, but the individual test will run sequentially.
//We can also tag test with @web in the test title, so while runnning the test we can specify like this : 
// npx playwright test --grep @web, so only the test with @web in the title will run.