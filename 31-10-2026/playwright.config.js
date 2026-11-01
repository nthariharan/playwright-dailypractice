import {defineConfig} from '@playwright/test';

export default defineConfig({
  testDir : './tests',
  reporter :'html',
  timeout : 30*1000,
  expect : {
    timeout : 10*1000
  },
  use:{
    browserName : 'chromium',
    trace : 'on',
    headless : false
  }
});

