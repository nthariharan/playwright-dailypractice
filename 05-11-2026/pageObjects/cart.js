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

    async cartCheckOut(tgtProduct, shipCountry) {
        await this.btn_checkout.click();

        await this.paymentInfo.waitFor();

        //await expect(this.paymentUserName).toHaveText(process.env.USER_ID);
        
    }

    async verifyPaymentUserName(){
        await expect(this.paymentUserName).toHaveText(process.env.USER_ID);
    }

    async enterShipmentCountry(inputCountry,shipCountry){
        await this.txtShipCountry.pressSequentially(inputCountry);
        await expect(this.countrySearchResult).toBeVisible();
        await this.countrySearchResult.filter({ hasText: shipCountry }).click();

        await expect(this.btnPlaceOrder).toBeVisible();
        await this.btnPlaceOrder.click();

    }

}

export default cart;