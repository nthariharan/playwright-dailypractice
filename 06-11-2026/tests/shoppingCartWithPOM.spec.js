import { test, expect } from '@playwright/test';
import poManager from '../pageObjects/poManager';
import testData from '../testData/testData1.json' with {type: 'json'};

for (const data of testData) {
    test(`Shopping Cart with Page Objects for Product = ${data.tgtProduct} - 03/11/2026`, async ({ page }) => {

        //PO manager Initiation
        const POManager = new poManager(page);

        await POManager.login_page.login(process.env.USER_ID, process.env.PWD, data.baseURL);
        await page.waitForURL('**\/dashboard\/dash');
        await POManager.dashBoard.selectProduct(data.tgtProduct); //Search the product and add to cart.
        await POManager.Cart.cart_items.first().waitFor();
        await expect(POManager.Cart.cart_items.getByText(data.tgtProduct)).toBeVisible();

        await POManager.Cart.cartCheckOut(data.tgtProduct, data.shipCountry);
        await POManager.Cart.verifyPaymentUserName(); //Verify user name.
        await POManager.Cart.enterShipmentCountry(data.inputCountry, data.shipCountry);

        const OrderID = await POManager.Thankyou.getOrderID(); //get ORder ID
        await POManager.Thankyou.myOrders.click(OrderID);
        await POManager.MyOrders.viewMyOrder(OrderID);

    });
}

