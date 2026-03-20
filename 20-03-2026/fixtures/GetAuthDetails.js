const base = require('@playwright/test');
const {expect} = base;

exports.test = base.test.extend({
    token:
        /*** @param {{request : import('@playwright/test').APIRequestContext}} */
        async ({request}, use) => {
            const TOKENURL = 'https://rahulshettyacademy.com/api/ecom/auth/login';
            const login_payload = { userEmail: process.env.MAIL_ID, userPassword: process.env.PWD };

            const orderResponse = await request.post(TOKENURL,{data: login_payload});
            expect(orderResponse.ok()).toBeTruthy();
            const json_orderResponse = await orderResponse.json();
            expect(json_orderResponse.message).toMatch('Login Successfully');
            const  token = json_orderResponse.token;
            await use(token);
        },

    orderId :
    /*** @param {{ request :import('@playwright/test').APIRequestContext , token : string}} */
    async({request, token}, use)=>{
        const ORDERURL = 'https://rahulshettyacademy.com/api/ecom/order/create-order';
        const orderPayload = {orders:[{country:"Anguilla",productOrderedId:"6960ea76c941646b7a8b3dd5"}]};
        const orderResponse = await request.post(ORDERURL,{
            data: orderPayload,
            headers:{
                Authorization : token
            }
        });

        expect(orderResponse.ok()).toBeTruthy();
        const json_orderResponse = await orderResponse.json();
        expect(json_orderResponse.message).toMatch('Order Placed Successfully');
        const orderId = json_orderResponse.orders[0];
        await use(orderId);

    }
});

exports.expect = base.expect;