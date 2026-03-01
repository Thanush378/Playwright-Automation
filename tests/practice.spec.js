import {test, expect} from '@playwright/test';

test('Trying something', async ({page}) =>{
 const userName = 'student'; 
 const passWord = 'Password123';
 await page.goto('https://practicetestautomation.com/practice-test-login/');
 await page.locator('//*[@id="username"]').fill(userName);
 await page.locator('//*[@id="password"]').fill(passWord);
 await page.locator('//*[@id="submit"]').click();
});


test.only('Something else', async({page}) => {
    await page.goto('https://practicetestautomation.com/practice-test-login/');
    await page.locator('//li/a[text() = "Home"]').click();
    const text = await page.locator('//p/strong/a[text() = "BestSeller XPath course"]').textContent();
    const arrayText = text.split(' ');
    const someArray = arrayText[0].split('r')[0];
    page.pause();
    console.log(someArray);
});