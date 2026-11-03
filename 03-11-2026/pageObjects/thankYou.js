import { expect } from "@playwright/test";

class thankYou {

    /**
     * 
     * @param {import("@playwright/test").Page} page 
     */
    constructor(page) {
        this.page = page;

        this.txtThankYou = this.page.getByText(' Thankyou for the order. ');
        this.txtOrder = this.page.locator('label.ng-star-inserted');
        this.myOrders = this.page.getByRole("listitem").getByRole("button", { name: "  ORDERS" });

    }

    async getOrderID() {
        await expect(this.txtThankYou).toBeVisible();
        this.OrderId = (await this.txtOrder.textContent()).split('|')[1];
        this.OrderId = this.OrderId.trim();
        console.log(this.OrderId);
    }

}

export default thankYou;