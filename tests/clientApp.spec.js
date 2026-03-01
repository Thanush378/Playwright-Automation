const {test, expect} = require('@playwright/test');

//Can use test.skip, when we two test cases doing the same actions.
test('Client APP login', async ({page}) => {
  //chrome - plugins/ cookies
  const email = "svthanush01@gmail.com";
  const products = page.locator('.card-body');
  const productName = 'ZARA COAT 3';
  await page.goto('https://rahulshettyacademy.com/client');
  await page.locator('#userEmail').fill(email);
  await page.locator('#userPassword').fill('TEstSite@@123#$');
  await page.locator('#login').click();
  //await page.waitForLoadState('networkidle');
  // Alternate way to wait for the page to load
    await page.waitForSelector('.card-body b');
  const allTitles = await page.locator('.card-body b').allTextContents();
  console.log(allTitles);
  // If we want to click on the add to cart button of a specific product, we can use the following code
  //count is used to get the number of products in the page and then we can loop through the products to find the specific product and click on the add to cart button
  const count = await products.count();
  for (let i=0; i < count; i++){
    if (await products.nth(i).locator('b').textContent() === productName) {
       // add to cart
        await products.nth(i).locator("text= Add To Cart").click();
        break;
    }
  }
  await page.locator("[routerlink*='cart']").click();
  await page.locator("div li").first().waitFor();
  const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
  expect(bool).toBeTruthy();
  await page.locator("text=Checkout").click();
  await page.locator("[placeholder*='Country']").pressSequentially("ind", {delay: 100});
  const dropdown = page.locator(".ta-results");
  await dropdown.waitFor();
  const optionsCount = await dropdown.locator("button").count();
  for (let i=0; i < optionsCount; i++){
    const text = await dropdown.locator("button").nth(i).textContent();
    if (text.trim() === "India") {
      await dropdown.locator("button").nth(i).click();
      break;
    }
  }
  await expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
  await page.locator(".action__submit").click();
  await expect(page.locator(".hero-primary")).toHaveText("Thankyou for the order. ");
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


// POM, test data (username, password) 
// SDET QA - Pavan