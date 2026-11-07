import {defineConfig} from '@playwright/test';
import { loadEnvFile } from 'node:process';

loadEnvFile();

export default defineConfig({
  timeout : 30*1000,
  expect : {
    timeout : 10*1000
  },
  reporter : 'html',
  use:{
    browserName : 'chromium',
    headless : true,
    trace :'on',
    actionTimeout : 10*1000
  },
  projects : [
    {
      name : "daily",
      testDir : "./daily"
    },
    {
      name : "shop",
      testDir : "./tests"
    },
    {
      name : "stable",
      testDir : "./stableCodes"
    }
  ]
});
