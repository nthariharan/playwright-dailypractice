const base = require('@playwright/test');
const expect = base.expect;

exports.test = base.test.extend({
    token:
        /*** @param {{request : import('@playwright/test').APIRequestContext}} */
        async ({ request }, use) => {
            const TOKENURL = 'https://rahulshettyacademy.com/api/ecom/auth/login';
            const login_payload = { userEmail: process.env.MAIL_ID, userPassword: process.env.PWD };

            const apiResponse = await request.post(TOKENURL, { data: login_payload });
            expect(apiResponse.ok()).toBeTruthy();
            const json_apiResponse = await apiResponse.json();
            expect(json_apiResponse.message).toMatch('Login Successfull');
            const token = json_apiResponse.token;
            await use(token);
        },
    orderId:
        /*** @param {{request : import('@playwright/test').APIRequestContext ,  token : string}} */
        async ({ request, token }, use) => {
            const ORDERURL = 'https://rahulshettyacademy.com/api/ecom/order/create-order';
            const orderPayload = { orders: [{ country: "Anguilla", productOrderedId: "6960ea76c941646b7a8b3dd5" }] };

            const orderAPIResp = await request.post(ORDERURL, {
                data: orderPayload,
                headers: {
                    Authorization: token
                }
            });

            expect(orderAPIResp.ok()).toBeTruthy();
            const json_orderResp = await orderAPIResp.json();
            expect(json_orderResp.message).toMatch(/order placed successfull/i);
            const orderId = json_orderResp.orders[0];
            await use(orderId);

        },
    authPage:
        /*** @param {{token : string, context : import('@playwright/test').BrowserContext}} */
        async ({ token, context }, use) => {
            await context.addInitScript((value) => window.localStorage.setItem('token', value), token);
            const page = await context.newPage();
            await use(page);

            //Cleanup
            await context.close();
        }
});

exports.expect = base.expect;