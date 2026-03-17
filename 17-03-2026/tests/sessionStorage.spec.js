const { customTest, expect } = require('../fixtures/sessionStorage');


customTest("Access website with session storage @SESSION", async ({ sessionFile, browser }) => {
    const context =await browser.newContext({storageState: sessionFile});
    const page = await context.newPage();
    const endPoint = "https://rahulshettyacademy.com/client/";
    const navbar = page.getByRole('navigation');

    await page.goto(endPoint);
    await expect(page).toHaveURL(/\/dashboard\/dash$/);
    await expect(navbar).toBeVisible();

    //Cleanup
    await context.close();

});