import {test,expect} from '@playwright/test'


test("JavaScript Popup Handling - 24/10/2026", async({page})=>{

    const custName = "V-MAX";
    const confirmMsg = `Hello ${custName}, Are you sure you want to confirm?`;

    //Listener
    page.on("dialog",async (dialog)=>{
        console.log(dialog.message());
        expect(dialog.message()).toEqual(confirmMsg);
        await dialog.accept();

    });
    

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    const popupBox = page.getByRole("group",{name:"Switch To Alert Example"});

    await popupBox.getByPlaceholder("Enter Your Name").fill(custName);
    await popupBox.getByRole("button",{name:"Confirm"}).click(); 

});