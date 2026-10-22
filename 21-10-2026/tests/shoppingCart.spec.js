import {test,expect} from '@playwright/test'


test("Shopping Cart -21/10/2026", async({page})=>{

    const siteUrl = "https://rahulshettyacademy.com/client/";
    const txtEmail = page.locator('#userEmail');
    const txtPwd = page.locator("#userPassword");
    const btnLogin = page.locator("#login");
    const locator_productName = page.locator("div.card-body h5");

    const value_txtEmail = "testmail1@test.com";
    const value_txtPwd = "Testmail@123";

    await page.goto(siteUrl);
    await txtEmail.fill(value_txtEmail);
    await txtPwd.fill(value_txtPwd);
    await btnLogin.click();
   // console.log(await locator_productName.first().textContent());
   await locator_productName.last().waitFor();
   console.log(await locator_productName.allTextContents());
    

});