const { expect } = require('@playwright/test');
const {customTest} = require('../fixtures/authenticatedPage');


customTest('Direct Login @DIRECT' , 
    /*** @param {{authPage : import('@playwright/test').Page  }} */
    async({authPage})=>{
    //authPage provides a page object with login tokens set.

    await authPage.goto('https://rahulshettyacademy.com/client');
    await expect(authPage.getByRole('navigation')).toBeVisible();
    await expect(authPage).toHaveURL(/.*\/dashboard\/dash/);
    await expect(authPage).toHaveTitle('Let\'s Shop');
});
