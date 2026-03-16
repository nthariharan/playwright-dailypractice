const base = require('@playwright/test');
const {expect} = base;

exports.customTest = base.test.extend({
    /*** @param { {request : import('@playwright/test').APIRequestContext} } */

    token: async ({ request }, use) => {
        const login_payload = { userEmail: process.env.MAIL_ID, userPassword: process.env.PWD };
        const loginResponse = await request.post("https://rahulshettyacademy.com/api/ecom/auth/login", {
            data: login_payload
        });
        expect(loginResponse.ok()).toBeTruthy();
        const json_loginResponse = await loginResponse.json();
        expect(json_loginResponse.message).toEqual("Login Successfully");
        const token = json_loginResponse.token;
        await use(token);

        //Cleanup
        //No cleanup required since we are using bultin request api context.
    }
});

exports.expect = base.expect;