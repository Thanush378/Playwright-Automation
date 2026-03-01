import {test, expect, request} from '@playwright/test';

test("@API Security test request interception", async ({page}) => {
     const email = "svthanush01@gmail.com";
    const products = page.locator('.card-body');
    const productName = 'ZARA COAT 3';
    await page.goto('https://rahulshettyacademy.com/client');
    await page.locator('#userEmail').fill(email);
    await page.locator('#userPassword').fill('TEstSite@@123#$');
    await page.locator('#login').click();
    await page.waitForLoadState('networkidle');
    // Alternate way to wait for the page to load
    await page.waitForSelector('.card-body b');
    await page.locator("button[routerlink*='myorders']").click();


    //Route.continue is used to intercept the request and return the response from the API call instead of the actual API call
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*", 
    route => route.continue({url: "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=698c40a848d62064b2fcc3h4"}));
    await page.locator("button:has-text('View')").first().click();
    await expect(page.locator(".blink_me")).toBeVisible();
});