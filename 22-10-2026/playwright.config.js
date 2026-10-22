import {defineConfig} from '@playwright/test';
import { on } from 'node:cluster';


export default defineConfig ({
  testDir : './tests',
  timeout : 30*1000,
  expect :{
    timeout : 10*1000
  },
  reporter : 'html',
  use:{
    browserName : 'chromium',
    headless : true,
    trace : 'on',
    actionTimeout : 10*1000
  }


});