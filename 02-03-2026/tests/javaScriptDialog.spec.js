const { test, expect } = require('@playwright/test');
const AutomationPractice = require('../pageObjects/AutomationPractice');

test("JavaScript Dialog Handling @DIA", async ({ page }) => {

    const pageObj = new AutomationPractice(page);
    
    /*** Listener */
    page.on('dialog', async (dialog) => {
        expect(dialog.message()).toEqual(pageObj.alertMsg);
        console.log(dialog.message());
        await dialog.accept();
    });

    await test.step("Fill User Name and Trigger Alert",async () => {
        await page.goto(pageObj.endPoint, { waitUntil: 'load' });
        await expect(pageObj.txtBox_dialogSection).toBeVisible();
        await pageObj.txtBox_dialogSection.fill(pageObj.userName);
        await pageObj.btnAlert_dialogSection.click();
    });

});