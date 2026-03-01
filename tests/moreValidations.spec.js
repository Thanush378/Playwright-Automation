import { test, expect  } from  '@playwright/test';

//test.describe.configure({mode: 'parallel'}); // This will run the tests in parallel mode
//test.describe.configure({mode: 'serial'}); // This will run the tests in serial mode
//serial mode will help when we have interdependcy between the test, it'll allow the excecution of the tests only if the previous test is passed, or-else it will skip the remaining tests.

test('Pop up Validations', async ({page}) => {
   await page.goto('https://rahulshettyacademy.com/AutomationPractice/');

   await expect(page.locator('#displayed-text')).toBeVisible(); //asserting that the text is visible
   await page.locator('#hide-textbox').click(); //clicking the hide button
   await expect(page.locator('#displayed-text')).toBeHidden(); //asserting that the text is not visible 
   
   
   // Handling the alert pop up or the dialog pop up
   page.on("dialog", dialog => dialog.accept()); //handling the alert pop up or you can also use "dialog.dismiss()" to dismiss the alert pop up
   await page.locator('#confirmbtn').click(); //clicking the confirm button
   
   
   // handling hover functionality
    //await page.pause();
    await page.locator('#mousehover').hover(); //hovering over the mouse hover button
    await page.locator(".mouse-hover-content [href*='#top']").click();

    
    //Handling frames
    const framesPage = page.frameLocator("#courses-iframe"); //..frameLocator method is used to locate the frame and then we can perform actions on the elements inside the frame
    await framesPage.locator("li a[href*='lifetime-access']:visible").click(); // :visible is used to click on the element which is visible in the frame
    const textCheck = await framesPage.locator(".text h2").textContent();
    console.log(textCheck.split(" ")[1]);

  // await page.goto('https://www.google.com/');
  // await page.goBack();
   // await page.goForward();
});

test('Screenshot and visual comparison', async ({page}) => {
   await page.goto('https://rahulshettyacademy.com/AutomationPractice/');

   await expect(page.locator('#displayed-text')).toBeVisible(); //asserting that the text is visible
   await page.locator("#displayed-text").screenshot({path: 'textbox.png'}); //taking a screenshot of the text box and saving it in the current directory with the name 'textbox.png'
   await page.locator('#hide-textbox').click(); //clicking the hide button
   await page.screenshot({path: 'screenshot.png'}); //taking a screenshot of the page and saving it in the current directory with the name 'screenshot.png'
   await expect(page.locator('#displayed-text')).toBeHidden(); //asserting that the text is not visible 

});


test("visual testing", async ({page}) => {
   await page.goto('https://www.google.com/');
   expect(await page.screenshot()).toMatchSnapshot('landing.png'); //taking a screenshot of the page and comparing it with the existing screenshot with the name 'landing.png' in the current directory. If the screenshots are different, then the test will fail and it will show the difference between the two screenshots.
});