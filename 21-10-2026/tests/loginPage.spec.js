import {test,expect} from '@playwright/test'


test("Login page practice - 21/10/2026", async({page})=>{

    //Locators
    const txt_userName = page.locator('#username');
    const txt_pwd = page.locator('#password');
    const btn_signIn = page.locator('#signInBtn');
    const locator_error = page.locator('[style*="block"]');
    const val_userName = "rahulshettyacademy";
    const val_pwd = "Learning@830$3mK2";
    const locator_titles = page.locator('.card-body .card-title');
    const btn_radio = page.locator('.customradio');
    const typeDropDown = page.locator("select.form-control");
    const btn_popupOK = page.locator("#okayBtn");
    const link_docRequest = page.locator("a[href*=document]");

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await txt_userName.fill("Testusername");
    await txt_pwd.fill("PASSWORD");
    await btn_radio.nth(1).click();
    await btn_popupOK.click();
    await typeDropDown.selectOption('teach');

    //Assertions
    await expect(link_docRequest).toHaveAttribute('class','blinkingText');
    await expect(btn_radio.nth(1)).toBeChecked();
    console.log("Is checked ?? =>", await btn_radio.nth(1).isChecked());
    expect(await btn_radio.first().isChecked()).toBeFalsy();




    //#######  PAUSE ###########
    await page.pause();

    await btn_signIn.click();

    console.log(await locator_error.textContent());
    await txt_userName.fill("");
    await txt_pwd.fill("");

    await txt_userName.fill(val_userName);
    await txt_pwd.fill(val_pwd);
    await btn_signIn.click();

    //await page.waitForURL('https://rahulshettyacademy.com/angularpractice/shop');
    console.log (await locator_titles.first().textContent());
    const all_titles = await locator_titles.allTextContents();
    console.log(all_titles);

});


