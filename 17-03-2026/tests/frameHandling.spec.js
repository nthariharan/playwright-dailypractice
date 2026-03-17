const { test, expect } = require('@playwright/test');

test.describe("Frame Handling", async () => {
    test("Handle Frames @FRAME", async ({ page }) => {

        await test.step("Navigate to the WebPage", async () => {
            await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
        });

        await test.step("Using page.frame() ", async () => {
            //Using Frame
            const frame1 = page.frame("iframe-name");
            expect(frame1.url()).toBe('https://legacy.rahulshettyacademy.com/');
            await expect(frame1.getByRole('navigation')).toBeVisible();
        })

        await test.step("Using page.framelocator()", async () => {
            //Using Framelocator
            const fLocator = page.frameLocator('#courses-iframe');
            await expect(fLocator.getByRole('navigation')).toBeVisible();
        });
    });
})
