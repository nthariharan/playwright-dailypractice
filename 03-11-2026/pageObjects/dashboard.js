class dashboard {

    /**
     * 
     * @param {import("@playwright/test").Page} page 
     */
    constructor(page) {
        this.page = page;
        this.productCard = page.locator('div .card');
        this.menu_cart = page.getByRole("listitem").getByRole("button", { name: "Cart" });
    }

    async selectProduct(tgtProduct) {
        await this.productCard.last().waitFor();
        const selectedProduct = this.productCard.filter({hasText:tgtProduct});
        await selectedProduct.getByRole("button",{name:" Add To Cart"}).click();
        await this.menu_cart.click();
    }
}

export default dashboard;