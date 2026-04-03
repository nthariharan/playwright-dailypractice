const {test,expect} = require('../fixtures/authentication');


test("Authentication via Fixtures @AUTH",
    /*** @param {{authPage : import('@playwright/test').Page}} */
    async({token,orderId,authPage})=>{
    console.log("Token =>", token);
    console.log("Order Id =>",orderId);

    await authPage.goto('https://rahulshettyacademy.com/client/');
    await expect(authPage.getByRole('navigation')).toBeVisible();
});