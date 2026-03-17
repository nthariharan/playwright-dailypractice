const base = require('@playwright/test');
const { expect } = base;

exports.customTest = base.test.extend({
    sessionFile: [
        /*** @param {{browser : import('@playwright/test').Browser}} */
        async ({ browser }, use) => {
            const context = await browser.newContext();
            const page = await context.newPage();
            const endPoint = "https://rahulshettyacademy.com/client/";
            await page.goto(endPoint);          
            
            const txtBox_Mail = page.getByRole('textbox', { name: /email/i });
            const txtBox_Pwd = page.getByRole('textbox', { name: /passsword/i });
            const btnLogin = page.getByRole('button', { name: /login/i });
            const navbar = page.getByRole('navigation');
            const filePath = './storagestate/session.json';

            
            await expect(txtBox_Pwd).toBeVisible();
            await txtBox_Mail.fill(process.env.MAIL_ID);
            await txtBox_Pwd.fill(process.env.PWD);
            await btnLogin.click();

            await expect(page).toHaveURL(/\/dashboard\/dash$/);
            await expect(navbar).toBeVisible();
            // await page.waitForLoadState('domcontentloaded'); 
            // await page.waitForLoadState('load');            
            await context.storageState({ path: filePath });

            await context.close();
            await use(filePath);
        }, {scope : 'worker'}]
});

exports.expect = base.expect;