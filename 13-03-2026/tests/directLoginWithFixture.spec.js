const {test,expect} = require('../fixtures/authenticatedPage');

/***
 * Using custom fixture to get authenticated Page.
 * 
 * Another method can also be used to get only the token and create page in the test spec.
 */

test("Direct Login with getToken Fixture @TOKENFIX" , async({authenticatedPage})=>{
    const LOGINURL = "https://rahulshettyacademy.com/client/";
    
    await authenticatedPage.goto(LOGINURL);
    await expect(authenticatedPage.getByRole('navigation')).toBeVisible();
});
