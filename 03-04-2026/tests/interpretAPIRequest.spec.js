const { test, expect } = require('../fixtures/authentication');


test.describe("Interpret API request", async () => {
    test("@INTER",
        /*** @param {{authPage : import('@playwright/test').Page}} */
        async ({ authPage }) => {
            const endPoint = 'https://rahulshettyacademy.com/client/';
            const getOrderDetails = 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*';

            await test.step("Navigate to the Site", async () => {
                await authPage.goto(endPoint);
            });

            /*** Listener */
            await test.step("API Request Listener", async () => {
                authPage.route(getOrderDetails, async (route, request) => {
                    let origURL = request.url();
                    let mockURL = origURL.replace(/.{3}$/, "123");
                    await route.continue({ url: mockURL });
                });
            });

            const navbar = authPage.getByRole('navigation');
            const myOrders = navbar.getByRole('button', { name: /orders/i });
            const viewFirstOrder = authPage.getByRole('button', { name: /view/i }).first();
            const errorMsg = authPage.getByText(/you are not authorize to view this order/i);

            await test.step("Navigate to the Orders Page", async () => {
                await expect(navbar).toBeVisible();
                await expect(myOrders).toBeVisible();
                await myOrders.click();
                await expect(authPage).toHaveURL(/\/myorders$/i);
                await expect(viewFirstOrder).toBeVisible();
            });

            await test.step("View the first Order", async () => {
                await viewFirstOrder.click();
            });


            await test.step("Verify the Error Message", async () => {
                await expect(authPage).toHaveURL(/order-details/);
                await expect(errorMsg).toBeVisible();
            });

        });
});