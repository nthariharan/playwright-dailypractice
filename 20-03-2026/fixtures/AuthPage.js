const test = require('./GetAuthDetails');

exports.test = test.test.extend({
    authPage:
        /*** @param {{context  : import('@playwright/test').BrowserContext ,  token : string }}  * */
        async ({ context, token }, use) => {
            await context.addInitScript((val) => window.localStorage.setItem('token', val), token);
            const page = await context.newPage();
            await use(page);

            //Cleanup
            await context.close();
        }
});

exports.expect = test.expect;