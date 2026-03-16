const { customTest, expect } = require('./getToken');

exports.customTest = customTest.extend({
    /*** @param {{request : import('@playwright/test').APIRequestContext}} */
    orderId: async ({ token ,request }, use) => {
        const ORDER_URL = "https://rahulshettyacademy.com/api/ecom/order/create-order";
        const orderPayload = { orders: [{ country: "Anguilla", productOrderedId: "6960ea76c941646b7a8b3dd5" }] };

        const orderResponse = await request.post(ORDER_URL,{
            data : orderPayload,
            headers:{
                Authorization : token
            }
        });

        expect(orderResponse.ok()).toBeTruthy();
        const json_orderResponse = await orderResponse.json();
        expect(json_orderResponse.message).toMatch('Order Placed Successfully');
        const orderId = json_orderResponse.orders;
        await use(orderId);


    }
});
