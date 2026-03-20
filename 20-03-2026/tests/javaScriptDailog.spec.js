const {test,expect} = require('@playwright/test');


test("Native JavaScript Dialog @DIA", async({page})=>{
    const endPoint = 'https://rahulshettyacademy.com/AutomationPractice/';
    await page.goto(endPoint);

    const alertSection = page.getByRole('group', {name :  'Switch To Alert Example'});
    const txtboxAlert = alertSection.getByRole('textbox');
    const btnAlert = alertSection.getByRole('button',{name:'Alert'});
    const userName = 'Test';
    const msgAlert = `Hello ${userName}, share this practice page and share your knowledge`

    /** Listener */
    page.on('dialog',(dialog)=>{
        console.log(dialog.message());
        expect(dialog.message()).toMatch(msgAlert);
        dialog.accept();
    });

    await expect(alertSection).toBeVisible();
    await txtboxAlert.fill(userName);
    await btnAlert.click();
});