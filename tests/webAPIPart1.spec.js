import {test, expect, request} from '@playwright/test';
import {APIutils} from '../utils/APIutils';
const loginPayLoad = {userEmail: "svthanush01@gmail.com", userPassword: "TEstSite@@123#$"};
const orderPayLoad = {orders: [{country: "Cuba", productOrderedId: "6960eac0c941646b7a8b3e68"}]};
let response;

test.beforeAll(async () => {
    //Login API call to get the token
    const apiContext = await request.newContext();
    const apiUtils = new APIutils(apiContext, loginPayLoad);
    response = await apiUtils.createOrder(orderPayLoad);
    //Login API call to create an order
});

test('Place the Order', async ({page}) => {
  //chrome - plugins/ cookies
   await page.addInitScript(value =>{
    window.localStorage.setItem('token', value);
   }, response.token); 
  await page.goto('https://rahulshettyacademy.com/client');
  await page.locator("button[routerlink*='myorders']").click();
  await page.locator("tbody").waitFor();
  const rows = page.locator("tbody tr");
  for (let i=0; i<await rows.count(); i++) {
    const rowOrderID = await rows.nth(i).locator("th").textContent();
   if(response.orderID.includes(rowOrderID)) {
      await rows.nth(i).locator("button").first().click();
      break;
   } 
  } 
  const orderIdDetails = await page.locator(".col-text").textContent();
  await page.pause();
  expect(response.orderID.includes(orderIdDetails)).toBeTruthy();
});