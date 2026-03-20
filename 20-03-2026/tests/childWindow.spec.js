const { test, expect } = require('@playwright/test');


test("Child Window Handling @CHILD", async ({ page }) => {
    const endPoint = 'https://rahulshettyacademy.com/loginpagePractise/';
    await page.goto(endPoint);

    const link = page.getByRole('link', { name: /TechSmartHire$/ });
    const box = await link.boundingBox();
    const newTabURL = 'https://techsmarthire.com/';

    await expect(link).toBeVisible();
    
    //Link has some issues hence clicking on the right side of the link.
    const [newTab] = await Promise.all([
        page.waitForEvent('popup'),
        link.click({ position: {
                x: box.width - 5,   // 5px from the right edge
                y: box.height / 2   // vertically centered
                 }
            })
    ]);

    const btnJobs = newTab.getByRole('button', { name: 'Browse Open Jobs' });

    await expect(newTab).toHaveURL(newTabURL);
    await expect(btnJobs).toBeVisible();
});