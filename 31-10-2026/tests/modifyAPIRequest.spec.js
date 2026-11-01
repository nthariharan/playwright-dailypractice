import { test, request,expect } from '@playwright/test'
import { apiUtils } from '../utils/apiUtils';

let token;

test.beforeAll(async () => {

    const APIUtils = new apiUtils();
    const apiReq = await request.newContext();

    token = await APIUtils.getToken(apiReq);
    console.log("Token =>", token);
});


test("Modify API Request", async ({ page }) => {
    

    /** Listener to intercept API request and modify */
    page.route(/\/get-orders-details\?id=*/, async(route,request)=>{
        
        const resp = await route.fetch();
        //const reqURL = request.url();
        const tempURL = request.url().replace(/.{4}$/,'1234');
        await route.continue({
            url: tempURL
        });
    });



    const APIUtils = new apiUtils();
    const apiReq = await request.newContext();

    token = await APIUtils.getToken(apiReq);

    //Basic vars
    const baseURL = "https://rahulshettyacademy.com/client/"
    //Locators    
    const myOrders = page.getByRole("listitem").getByRole("button", { name: "  ORDERS" });


    //JS script to add token to the localstorage. Token is retrieved via API calls in test.beforeall block

    await page.addInitScript(addToken => {
        window.localStorage.setItem("token", addToken)
    }, token);

    //End of JS Script to include token in Local storage.

    await page.goto(baseURL);
    await page.waitForURL('**\/dashboard\/dash');

    await myOrders.click();
    await page.getByRole("button",{name:"View"}).first().click();
    await expect(page.getByText("You are not authorize to view this order")).toBeVisible();

});