class dashboard {

    /**
     * 
     * @param {import("@playwright/test").Page} page 
     */
    constructor(page) {
        this.page = page;
        this.tgtProduct = "ZARA COAT 3";
        this.shipCountry =" India";
        this.productCard = page.locator('div .card');
        this.menu_cart = page.getByRole("listitem").getByRole("button", { name: "Cart" });
    }

    async selectProduct() {
        await this.productCard.last().waitFor();
        const tot_products = await this.productCard.count();

        console.log(tot_products);

        for (let i = 0; i < tot_products; i++) {
            console.log(await this.productCard.nth(i).textContent());
            if (await this.productCard.nth(i).locator('h5').textContent() === this.tgtProduct) {
                await this.productCard.nth(i).getByRole("button", { name: " Add To Cart" }).click();
                break;
            }

        }

        await this.menu_cart.click();
    }
}

export default dashboard;