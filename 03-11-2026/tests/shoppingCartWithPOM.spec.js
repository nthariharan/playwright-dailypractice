import { test, expect } from '@playwright/test';
import poManager from '../pageObjects/poManager';

test("Shopping Cart with Page Objects - 03/11/2026", async ({ page }) => {

    //PO manager Initiation
    const POManager = new poManager(page);

    await POManager.login_page.login(process.env.USER_ID, process.env.PWD, POManager.baseURL);
    await page.waitForURL('**\/dashboard\/dash');
    await POManager.dashBoard.selectProduct(POManager.tgtProduct);
    await POManager.Cart.cart_items.first().waitFor();
    await expect(POManager.Cart.cart_items.getByText(POManager.tgtProduct)).toBeVisible();
    //  console.log(await this.cart_items.locator('h3').textContent());
    //     if (await this.cart_items.locator('h3').textContent() === tgtProduct) {
    //         console.log("product matches");
    //     }


    await POManager.Cart.cartCheckOut(POManager.tgtProduct,POManager.shipCountry);
    await POManager.Cart.verifyPaymentUserName(); //Verify user name.
    await POManager.Cart.enterShipmentCountry(POManager.shipCountry);

    const OrderID = await POManager.Thankyou.getOrderID(); //get ORder ID
    await POManager.Thankyou.myOrders.click(OrderID);
    await POManager.MyOrders.viewMyOrder(OrderID);


});