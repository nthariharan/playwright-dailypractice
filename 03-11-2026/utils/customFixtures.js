import { test } from '@playwright/test';
import { apiUtils } from '../utils/apiUtils';

/**
 * @typedef {object} customFixtures
 * @property {import('@playwright/test').Page} customPage
 */

/**
 * @type {import('@playwright/test').TestType<customFixtures,{}>}
 */
export const customTest = test.extend({
    
    customPage: async ({ page }, use) => {
        const baseURL = "https://rahulshettyacademy.com/client/"
        const userName = "testmail1@test.com"
        const pwd = "Testmail@123"
        //Locators
        const txt_email = page.getByPlaceholder("email@example.com");
        const txt_pwd = page.getByPlaceholder("enter your passsword")
        const btn_login = page.getByRole("button", { name: "Login" });
        const productCard = page.locator('div .card');

        await page.goto(baseURL);
        await txt_email.fill(userName);
        await txt_pwd.fill(pwd);
        await btn_login.click();
        await page.waitForURL('**\/dashboard\/dash');
        await productCard.last().waitFor();
        await use(page);

        //teardown
        await page.close();
    },

    createOrder: async ({request}, use) => {
        const APIUtils = new apiUtils();
        //const apiReq = await request.newContext();
        
        const values = {token:'',orderID:''};
        values.token = await APIUtils.getToken(request);
        values.orderID = await APIUtils.createOrder();
        await use(values);
        
    }

});

