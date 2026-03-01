const {test, expect} = require('@playwright/test');

test('Browser Context Playwright test', async ({browser}) => {
  //chrome - plugins/ cookies
    const context = await browser.newContext(); //creating a new browser context
    const page = await context.newPage(); //creating a new page in the browser
    //page.route('**/*.css', route => route.abort()); //blocking the css files to load
    //for blocking the images we can use the following code: {jpg, png, svg, gif}
    const userName = page.locator('#user-name');
    const signIn = page.locator('#login-button');
    const cardTitles = page.locator(".inventory_item .inventory_item_name");
    page.on('request', request => console.log(request.url())); //logging all the url's of the request made by the page
    page.on('response', response => console.log(response.url(), response.status())); //logging all the url's of the response received by the page along with the status code
    await page.goto('https://www.saucedemo.com/'); //navigating to saucedemo.com
    console.log(await page.title());
       // css, xpath
      await userName.fill('standard_use'); //filling the username field
      await page.locator("[type='password']").fill('secret_sauce'); //filling the password field
      await signIn.click(); //clicking the login button
      console.log(await page.locator('div.error-message-container').textContent());
      await expect(page.locator('div.error-message-container')).toContainText('Username'); //asserting the error message
      await userName.fill(''); //clearing the username field
      await userName.fill('standard_user');
      await signIn.click();
      // Also can use First or last menthod just like nth
        console.log(await cardTitles.first().textContent()); //printing the text of the first item in the inventory
        console.log(await cardTitles.nth(1).textContent()); //printing the text of the second item in the inventory
        const allTitles = await cardTitles.allTextContents();
        console.log(allTitles);

});

test('@Web UI Controls', async ({page}) => {
    await page.goto('https://rahulshettyacademy.com/loginpagePractise'); //navigating to google
    const userName = page.locator('#username');
    const signIn = page.locator('#signInBtn');
    const dropdown = page.locator('select.form-control');
    const documentLink = page.locator("[href*='documents-request']");
    await dropdown.selectOption('consult'); //selecting the option 'consult' from the dropdown
    await page.locator('.radiotextsty').last().click(); //clicking the last radio button
    await page.locator('#okayBtn').click(); //clicking the OK button on the alert
    //Assertion
    await expect(page.locator('.radiotextsty').last()).toBeChecked(); //asserting that the last radio button is checked
    console.log(await page.locator('.radiotextsty').last().isChecked()); //checking if the last radio button is checked
    await page.locator('#terms').click(); //checking the checkbox
    await expect(page.locator('#terms')).toBeChecked(); //asserting that the checkbox is checked
    await page.locator('#terms').uncheck(); //unchecking the checkbox
    expect(await page.locator('#terms').isChecked()).toBeFalsy(); //asserting that the checkbox is unchecked
    await expect(documentLink).toHaveAttribute('class', 'blinkingText'); //asserting that the document link has the class 'blinkingText'
});

test('Child windows Handle', async ({browser}) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const userName = page.locator('#username');
    await page.goto('https://rahulshettyacademy.com/loginpagePractise');
    const documentLink = page.locator("[href*='documents-request']");

   const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        documentLink.click(),
    ])
    const text = await newPage.locator('.red').textContent();
    const arrayText = text.split('@')
    const domain = arrayText[1].split(" ")[0]
    console.log(text);
    console.log(domain);
    await page.locator('#username').fill(domain);
    console.log(await userName.inputValue()) //inputValue is used to get the value of the input field

}); 

 //Debug mode helps in opening the browser in headed mode and also allows us to use the Playwright Inspector to debug our tests. We can use the following command to run the tests in debug mode:
// npx playwright test --debug
// Able to select the locators on the runtime and check where exactly the issue is occurring.

//Another tool can be used for getting the playwright code for the actions performed on the browser is the Playwright CODEGEN.
//  We can use the following command to open the Playwright CODEGEN:
// npx playwright codegen <url>// This will open the Playwright CODEGEN in the browser and we can perform the actions on the browser and it will generate the code for us in the Playwright CODEGEN.
//  We can also select the language in which we want the code to be generated. This is a very useful tool for getting the locators and also for getting the code for the actions performed on the browser.
