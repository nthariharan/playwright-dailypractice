import { defineConfig } from "@playwright/test";


export default defineConfig({

    testDir : './tests',
    timeout : 30*1000,
    expect:{
        timeout : 10*1000
    },
    reporter : 'html',
    use:{
        browserName : 'chromium',
        actionTimeout : 10*1000 ,
        headless : true,
        trace : 'on'
    }

});