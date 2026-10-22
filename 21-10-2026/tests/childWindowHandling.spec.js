import { test, expect } from '@playwright/test'


test("Child Window Handling - 21/10/2026", async ({ page }) => {

    //Locators
    const baseURL = "https://rahulshettyacademy.com/loginpagePractise/"
    const link_docRequest = page.locator("a[href*=document]");
    const txt_userName = page.locator('#username');
    await page.goto(baseURL);


    const [newPage] = await Promise.all([
        page.waitForEvent('popup'),
        link_docRequest.click()
    ]);

    await expect(newPage).toHaveTitle('RS Academy');
    console.log(await newPage.locator('.red').textContent());
    const tempText = await newPage.locator('.red').textContent();
    const domainText = tempText.split('@')[1].split(' ')[0];
    console.log(domainText);

    await txt_userName.fill(domainText);
    expect( await txt_userName.inputValue()).toMatch(domainText);
    await page.pause();  
    
});