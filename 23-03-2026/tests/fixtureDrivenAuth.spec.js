const { test, expect } = require('../fixtures/Authentication');


test.describe("Get Token Via Fixture", async () => {
    test("Fixture Driven Auth @AUTH -\
        1. Token,\
        2. OrderId,\
        3. authPage - authenticatedPage ",
        /*** @param {{authPage : import('@playwright/test').Page , token : string, orderId : string }} */
        async ({ token, orderId, authPage }) => {
            console.log("Token =>", token);
            console.log("Order Id =>", orderId);

            await authPage.goto('https://rahulshettyacademy.com/client/');
            await expect(authPage.getByRole('navigation')).toBeVisible();
        });
});