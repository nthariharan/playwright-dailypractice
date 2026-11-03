import {expect} from '@playwright/test';

class cart {

    /**
     * 
     * @param {import("@playwright/test").Page} page 
     */
    constructor(page) {
        this.page = page;
        this.cart_items = this.page.locator('li.items');//To change later
        this.btn_checkout = this.page.getByRole("button", { name: "Checkout" });
        this.paymentInfo = this.page.locator('.payment__info');
        this.paymentShipping = this.page.locator('.payment__shipping');
        this.paymentUserName = this.paymentShipping.locator('.user__name label');
        this.txtShipCountry = this.page.getByPlaceholder("Select Country");
        this.countrySearchResult = this.page.locator('.ta-results');
        this.btnPlaceOrder = this.page.getByText("Place Order");
    }

    async cartCheckOut() {
        await this.cart_items.first().waitFor();
        console.log(await this.cart_items.locator('h3').textContent());
        if (await this.cart_items.locator('h3').textContent() === this.tgtProduct) {
            console.log("product matches");
        }
        await this.btn_checkout.click();

        await this.paymentInfo.waitFor();
        await expect(this.paymentUserName).toHaveText(process.env.USER_ID);
        await this.txtShipCountry.pressSequentially('india');
        await expect(this.countrySearchResult).toBeVisible();
        await this.countrySearchResult.filter({ hasText: this.shipCountry }).click();

        await expect(this.btnPlaceOrder).toBeVisible();
        await this.btnPlaceOrder.click();


    }

}

export default cart;