import {test} from '@playwright/test';

test("Abort Network Request",async({page})=>{
    
    /** Listener to abort network request with CSS */
    page.route(/\.css$/,async(route)=>{
        route.abort();
    });

    /** log API calls */
    page.on("request",(req)=> console.log(req.url()));
    page.on("response",(resp)=> console.log(resp.status(),resp.url()));
    
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await page.pause();

});