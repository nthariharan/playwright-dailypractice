import { test, request,expect } from '@playwright/test'
import { apiUtils } from '../utils/apiUtils';

let token;

test.beforeAll(async () => {

    const APIUtils = new apiUtils();
    const apiReq = await request.newContext();

    token = await APIUtils.getToken(apiReq);
    console.log("Token =>", token);
});


test("Mock API Response", async ({ page }) => {
    

    /** Listener to mock API Response*/
    page.route(/\/get-orders-for-customer\//, async (route, request) => {
        const mockEmptyOrders = { data: [], message: "No Orders" };
        const resp = await route.fetch();
        const respJson = await resp.json();
        console.log(respJson);
        //console.log(request);
        await route.fulfill({
            body: JSON.stringify(mockEmptyOrders),
            response : resp
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
    
    await expect(page.getByText("You have no orders to show at this time")).toBeVisible();


});