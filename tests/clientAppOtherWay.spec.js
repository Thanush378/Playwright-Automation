const {test, expect} = require('@playwright/test');

test('Browser Context Playwright test', async ({page}) => {
  //chrome - plugins/ cookies
  const email = "svthanush01@gmail.com";
  const products = page.locator('.card-body');
  const productName = 'ZARA COAT 3';
  await page.goto('https://rahulshettyacademy.com/client');
  await page.getByPlaceholder('email@example.com').fill(email);
  await page.getByPlaceholder('enter your password').fill('TEstSite@@123#$');
  await page.getByRole('button', {name: 'Login'}).click();
  //await page.waitForLoadState('networkidle');
  // Alternate way to wait for the page to load
    await page.waitForSelector('.card-body b');
  const allTitles = await page.locator('.card-body b').allTextContents();
  console.log(allTitles);
  // If we want to click on the add to cart button of a specific product, we can use the following code
  //count is used to get the number of products in the page and then we can loop through the products to find the specific product and click on the add to cart button
  await page.locator(".card-body").filter({hasText: productName}).getByRole("button", {name: "Add To Cart"}).click();

  await page.getByRole("listitem").getByRole("button", {name: "Cart"}).click();
  
  await page.locator("div li").first().waitFor();
  
  await expect(page.getByText(productName)).toBeVisible();
  await page.getByRole("button", {name: "Checkout"}).click();
  
  await page.getByPlaceholder("Select Country").pressSequentially("ind");
  
  await page.getByRole("button", {name: "India"}).nth(1).click();
  
 
  await page.getByText("PLACE ORDER").click();

  await expect(page.getByText("Thankyou for the order.")).toBeVisible();


  const orderID = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
  console.log(orderID);
  await page.locator("button[routerlink*='myorders']").click();
  await page.locator("tbody").waitFor();
  const rows = await page.locator("tbody tr");
  for (let i=0; i<await rows.count(); i++) {
    const rowOrderID = await rows.nth(i).locator("th").textContent();
   if(orderID.includes(rowOrderID)) {
      await rows.nth(i).locator("button").first().click();
      break;
   } 
  } 
  const orderIdDetails = await page.locator(".col-text").textContent();
  expect(orderID.includes(orderIdDetails)).toBeTruthy();
});
