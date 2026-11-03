import {test,expect} from '@playwright/test'


test.beforeAll(async ({browser})=>{
    const context = await browser.newContext();
    const page = await context.newPage();
    //Basic vars
    const baseURL = "https://rahulshettyacademy.com/client/"
    const userName = "testmail1@test.com"
    const pwd = "Testmail@123"
    //Locators
    const txt_email = page.getByPlaceholder("email@example.com");
    const txt_pwd = page.getByPlaceholder("enter your passsword")
    const btn_login = page.getByRole("button",{name :"Login"});
    const productCard = page.locator('div .card');

    await page.goto(baseURL);
    await txt_email.fill(userName);
    await txt_pwd.fill(pwd);
    await btn_login.click();
    await page.waitForURL('**\/dashboard\/dash');
    await productCard.last().waitFor();
    await context.storageState({path : './session-storage/session.json'});
    await page.close();
    await context.close();
});



test("Session Storage - 24/10/2026", async({context})=>{
    await context.setStorageState('./session-storage/session.json');
    const page = await context.newPage();
    const baseURL = "https://rahulshettyacademy.com/client/";
    const productCard = page.locator('div .card');

    await page.goto(baseURL);
    await page.waitForURL('**\/dashboard\/dash');
    await productCard.last().waitFor();  
});