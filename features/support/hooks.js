const {Before, AfterStep, Status} = require('@cucumber/cucumber');
const playwright = require('playwright');
const { POManager } = require('../../pageobjects/POManager');


Before(/*{tags: "@Regression"}*/ async function () {
      const browser = await playwright.chromium.launch({headless: false});
        const context = await browser.newContext(); //creating a new browser context
        this.page = await context.newPage();
        this.poManager = new POManager(this.page);
});   

AfterStep(async function ({result}) {
    if(result.status === Status.FAILED){
        await this.page.screenshot({path: 'screenshot1.png'});
    }
});


//Hooks are used to perform some actions before or after the execution of the test cases. We also have BeforeAll and AfterAll and also BeforeStep and AfterStep hooks.
//  We can also specify the tags for which the hooks should be executed. 

// For example, if we want to execute the Before hook only for the test cases with @Regression tag, we can specify it like this: Before({tags: "@Regression"}, async function () { ... });

//Can also use tags in feature file to specify which test cases should be executed. 
// For example, if we want to execute only the test cases with @Regression tag, we can specify it like this: @Regression Scenario: ...

//And if we have mutliple data sets for the same test case, we can use "Scenario Outline" and Examples in the feature file to specify the data sets.

//If you want to run the tests in parallel, you can use the following command: 
// npx cucumber-js --features/Ecommerce.featture --parallel 2 --exit, this will run the tests in parallel mode with 2 workers.
//But cannot run 2 features parallely, but can run the scenarios in parallel mode.

//To get the report this should be the following command: 
//npx cucumber-js --features/Ecommerce.feature --format html:report.html, this will generate a report in html format with the name report.html in the current directory. We can also specify the path where we want to save the report.


//To rerun or retry the test-cases, you can use the following command: 
// npx cucumber-js --features/Ecommerce.feature --retry 2, this will retry the failed test cases up to 2 times.