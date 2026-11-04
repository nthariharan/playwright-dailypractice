import { test, expect, request } from '@playwright/test'
import {apiUtils} from '../utils/apiUtils';

let token, orderID;

test.beforeAll(async () => {

    const APIUtils = new apiUtils();
    const apiReq = await request.newContext();

    token = await APIUtils.getToken(apiReq);
    orderID = await APIUtils.createOrder();

    console.log("Token =>", token);
    console.log("OrderID =>", orderID);

});

test("Shopping Cart with API Calls - 24/10/2026", async ({ page }) => {

    //Basic vars
    const baseURL = "https://rahulshettyacademy.com/client/"
    //Locators    
    const myOrders = page.getByRole("listitem").getByRole("button", { name: "  ORDERS" });
    const yourOrders = page.getByText("Your Orders");
    const orderRows = page.locator('tbody tr');
    const txtOrderSummary = page.getByText(' order summary ');

    //JS script to add token to the localstorage. Token is retrieved via API calls in test.beforeall block

    await page.addInitScript(addToken => {
        window.localStorage.setItem("token", addToken)
    }, token);

    //End of JS Script to include token in Local storage.

    await page.goto(baseURL);
    await page.waitForURL('**\/dashboard\/dash');

    await myOrders.click();
    await expect(yourOrders).toBeVisible();
    await orderRows.first().waitFor();    
    await expect(orderRows.filter({hasText:orderID})).toBeVisible();
    const myOrderRow = orderRows.filter({hasText:orderID});
    await myOrderRow.getByRole("button", { name: "View" }).click();
    await expect(txtOrderSummary).toBeVisible();
    await expect(page.getByText(orderID)).toBeVisible();

});