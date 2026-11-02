import {test} from '@playwright/test';

const baseURL = "https://rahulshettyacademy.com/client/";

test.beforeAll(async({browser})=>{

    const browserContext = await browser.newContext();
    const page = await browserContext.newPage();


   
    const userId="newtest123@test.com";
    const pwd = "Testid@123$";
    const txtEmail = page.getByPlaceholder("email@example.com");
    const txtPwd = page.getByPlaceholder("enter your passsword");
    const btnLogin = page.getByRole("button",{name : "Login"});
    const productCards = page.locator(".card");

    await page.goto(baseURL);
    await txtEmail.fill(userId);
    await txtPwd.fill(pwd);
    await btnLogin.click();
    await productCards.last().waitFor();

    await browserContext.storageState({path : '.\\session.json'});
    await page.close();

});

test("Session Storage", async({browser})=>{
    const context = await browser.newContext();
    await context.setStorageState('.\\session.json');
    const page = await context.newPage();
    await page.goto(baseURL);

    await page.pause();

});