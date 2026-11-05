import { expect } from "@playwright/test";
class myOrders {

    /**
     * 
     * @param {import("@playwright/test").Page} page 
     */
    constructor(page) {
        this.page = page;
        this.yourOrders = page.getByText("Your Orders");
        this.orderRows = page.locator('tbody tr');
        this.txtOrderSummary = page.getByText(' order summary ');
    }

    async viewMyOrder(OrderID) {
        await expect(this.yourOrders).toBeVisible();

        await this.orderRows.first().waitFor();
        let orderCount = await this.orderRows.count();
        console.log("Order count =>", orderCount);
        for (let i = 0; i < orderCount; i++) {
            console.log(await this.orderRows.nth(i).locator('th').textContent());
            if (this.orderRows.nth(i).getByText(OrderID)) {
                console.log("in if loop");
                await this.orderRows.nth(i).getByRole("button", { name: "View" }).click();
                break;

            }
        }


        await expect(this.txtOrderSummary).toBeVisible();
    }

}

export default myOrders;