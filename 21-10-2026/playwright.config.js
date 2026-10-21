import {defineConfig} from '@playwright/test'



export default defineConfig({
  testDir :'./tests',
  timeout : 30*1000,
  reporter :'html',
  expect:{
    timeout : 10*1000
  },
  use:{
    browserName : 'chromium',
    headless : false,
    screenshot : 'on'
  }

});