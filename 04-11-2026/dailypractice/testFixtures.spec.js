import customTest from "../testFixtures/dataAsFixtures";


customTest("Test Data as Fixtures - 04/11/2026",async({customTestData,page},testInfo)=>{
    console.log(customTestData.customData1);
    console.log(testInfo.project.use.viewport);
    const viewPort = await page.viewportSize();
    console.log(viewPort);
});