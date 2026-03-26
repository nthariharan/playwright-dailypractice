const {test,expect}= require('../fixtures/authentication');

test("Get Token @AUTH", 
    /*** @param {{ token : string, orderId : string, authPage: import('@playwright/test').Page}} */
    async({token, orderId, authPage})=>{
    console.log("Token ==> ", token);
    console.log("Order ID = >", orderId);
    const endPoint = 'https://rahulshettyacademy.com/client/';
    await authPage.goto(endPoint);
    await expect(authPage.getByRole('navigation')).toBeVisible();
});