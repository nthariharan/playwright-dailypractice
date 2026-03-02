const { test, expect } = require('@playwright/test');

test.describe("Child Window Handling", async () => {
    test("Verify Link Opens A New Tab @CHILD", async ({ page }) => {
        const endPoint = "https://rahulshettyacademy.com/loginpagePractise/";
        const pageLink = page.getByRole('link', { name: 'ResumeAssistance' });

        await test.step("Access the Base site & assert that the link exists", async () => {
            await page.goto(endPoint, { waitUntil: 'load' });
            await expect(pageLink).toBeVisible();
        });

        await test.step("Click on the link and Wait for the new Tab , log the text", async () => {
            const [newTab] = await Promise.all([
                page.waitForEvent('popup'),
                pageLink.click()
            ]);
            await newTab.waitForLoadState('load');
            await expect(newTab.locator('.preloader')).toBeHidden();
            const targetTxt = newTab.getByRole('paragraph').getByText(/.*email us.*/i);
            await expect(targetTxt).toBeVisible();
            console.log(await targetTxt.textContent());
            await newTab.close();
        });


    });


})
