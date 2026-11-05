import {defineConfig} from '@playwright/test'

export default defineConfig({
  testDir : './tests',
  timeout : 300*1000,
  expect :{
    timeout :10*1000
  },
  reporter : 'html',
  use:{
    browserName: 'chromium',
    trace : 'on',
    headless : false,
    actionTimeout: 10*1000
  }
});