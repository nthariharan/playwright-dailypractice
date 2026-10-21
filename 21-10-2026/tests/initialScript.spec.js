import {test,expect} from '@playwright/test'

test("Sample test 1 - 21/10/2026",async ({page})=>{

    await page.goto("https://www.google.com");
    await expect(page).toHaveTitle('Google');

});