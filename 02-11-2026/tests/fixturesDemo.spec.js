import {customTest} from '../utils/customFixtures';
import {expect} from '@playwright/test';

customTest("Fixture Demo - 02/11/2026",    async({customPage, createOrder})=>{

    //Locators    
    const myOrders = customPage.getByRole("listitem").getByRole("button", { name: "  ORDERS" });
    // const yourOrders = customPage.getByText("Your Orders");
    // const orderRows = customPage.locator('tbody tr');
    // const txtOrderSummary = customPage.getByText(' order summary ');

    await customPage.goto("https://rahulshettyacademy.com/client/");
    await myOrders.click();
    console.log("Order Id from fixture", createOrder);
    await expect(customPage.getByText(createOrder.orderID)).toBeVisible();
});