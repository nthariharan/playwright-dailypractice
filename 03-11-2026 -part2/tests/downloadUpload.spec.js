import {test,expect} from '@playwright/test';


test("Download File and Upload File- 03-11-2026", async({page})=>{

   /*  //Listener for File download event
    page.on("download",  async(download)=>{
        //let fileName =  download.suggestedFilename();
        await download.saveAs('./exceltest.xls');
       
    }); */

   // const download = await page.waitForEvent('download');

    //locators
    const baseUrl = "https://rahulshettyacademy.com/upload-download-test/";

    await page.goto(baseUrl);
    //await page.pause();

    await page.getByRole("row").last().waitFor();

    
    
    const [download]=await Promise.all([
        page.waitForEvent('download'),
        page.getByRole("button",{name:"Download"}).click()
    ]);

    await download.saveAs('./exceltest.xls');


    await page.getByRole("button",{name:"Choose File"}).setInputFiles('./Modified.xls');

    // await page.pause();

    await page.getByRole("row").last().waitFor();
    const modifiedRow = page.getByRole("row").filter({hasText:"Banana"});
    await expect(modifiedRow.getByRole("cell").nth(3)).toHaveText("5678");
});