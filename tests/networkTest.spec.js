import {test, expect, request} from '@playwright/test';
import {APIutils} from '../utils/APIutils'
const loginPayLoad = {userEmail: "svthanush01@gmail.com", userPassword: "TEstSite@@123#$"};
const orderPayLoad = {orders: [{country: "Cuba", productOrderedId: "6960eac0c941646b7a8b3e68"}]};
const fakePayLoadOrders = {data: [], message: "No Orders"};
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

  //Route is used to intercept the API call and return the response from the API call instead of the actual API call
  await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*", async route => {
    //intercepting the API call and returning the response from the API call instead of the actual API call
    //intercepting response - API response ->{playwright fake response} -> browser -> render data on the UI
    const response = await page.request.fetch(route.request());
    let body = fakePayLoadOrders;
    route.fulfill(
      {
        response,
        body: JSON.stringify(body),
      }
    )
  });
  await page.locator("button[routerlink*='myorders']").click(); 
  await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*");
  console.log(await page.locator(".mt-4").textContent());
  
});