const { test, expect } = require('../fixtures/authentication');


test.describe("Mock API Response", async () => {
 test("@MOCK",
        /*** @param {{authPage : import('@playwright/test').Page}} */
        async ({ authPage }) => {
            const endPoint = 'https://rahulshettyacademy.com/client/';
            const getMyOrders = 'https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*';

            await test.step("Navigate to the Site", async () => {
                await authPage.goto(endPoint);
            });


            /*** Listener */
            await test.step("API Request Listener", async () => {
                authPage.route(getMyOrders, async (route, request) => {
                    let origResp = await route.fetch();
                    const mockViewResp ={data:[],message:"No Orders"};
                    await route.fulfill({
                        body : JSON.stringify(mockViewResp),
                        headers : origResp.headers(),
                        response : origResp,
                        status :  origResp.status()
                    });
                });
            });

            const navbar = authPage.getByRole('navigation');
            const myOrders = navbar.getByRole('button', { name: /orders/i });
            const errorMsg = authPage.getByText(/no orders/i);

            await test.step("Navigate to the Orders Page", async () => {
                await expect(navbar).toBeVisible();
                await expect(myOrders).toBeVisible();
                await myOrders.click();
                
            });

            await test.step("Verify the Error Message", async () => {
                await expect(authPage).toHaveURL(/\/myorders$/i);
                await expect(errorMsg).toBeVisible();
            });


        });

});