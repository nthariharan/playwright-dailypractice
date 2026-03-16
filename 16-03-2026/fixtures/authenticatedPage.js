const {customTest} = require('./createOrder');

exports.customTest = customTest.extend({

    /*** @param {{browser : import('@playwright/test').Browser}} */
    authPage : async({token, browser},use)=>{
        const context = await browser.newContext();
        await context.addInitScript((value)=> window.localStorage.setItem('token',value),token);
        const page = await context.newPage();
        await use(page);

        //Cleanup
        await page.close();
        await context.close();
        await browser.close();
    }
});

