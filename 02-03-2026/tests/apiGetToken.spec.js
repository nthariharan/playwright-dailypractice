const { test, request, expect } = require('@playwright/test');
/** @type string */
let token;

/** @type {import('@playwright/test').APIRequestContext} */
let api;
test.describe("Using API calls to get Token , Place Order & Access Site Without Login", () => {

    test("API Calls @API", async ({ browser }) => {
        let endPoint = "https://rahulshettyacademy.com/api/ecom/auth/login";
        const context = await browser.newContext();
        api = await request.newContext({ ignoreHTTPSErrors: true });
        let login_payload = { userEmail: process.env.email, userPassword: process.env.pwd };

        await test.step("API Call To Get Token", async () => {
            const apiResp = await api.post(endPoint, {
                data: login_payload
            });

            expect(apiResp.ok()).toBeTruthy();
            const json_apiResp = await apiResp.json();
            expect(json_apiResp.message).toMatch('Login Successfull');
            expect(json_apiResp).toHaveProperty('token');
            token = json_apiResp.token;
        });

        await test.step("Ensure Token is not Empty", async () => {
            expect(token).toBeTruthy();
            console.log("Token =>", token);
        });

        await test.step("Create Order using the Token Fetched", async () => {
            let endPoint = "https://rahulshettyacademy.com/api/ecom/order/create-order";
            let orderPayload = { "orders": [{ "country": "Argentina", "productOrderedId": "6960eae1c941646b7a8b3ed3" }] };
            const orderResp = await api.post(endPoint, {
                data: orderPayload,
                headers: {
                    'Authorization': token
                }
            });

            expect(orderResp.ok()).toBeTruthy();
            const json_orderResp = await orderResp.json();
            expect(json_orderResp).toHaveProperty('productOrderId');
            expect(json_orderResp.message).toMatch(/order placed success/i);
            
        });

        await test.step("Add Token To Browser Context & Access Site", async () => {
            
            await context.addInitScript((val) => {
                window.localStorage.setItem('token', val)
            },
                token);

            const page = await context.newPage();
            await page.goto("https://rahulshettyacademy.com/client",{waitUntil:'load'});
            await expect(page.getByRole('navigation')).toBeVisible();
            
        });

        await test.step("Cleanup",async()=>{
            await api.dispose();
            await context.close();
        })

    });

});