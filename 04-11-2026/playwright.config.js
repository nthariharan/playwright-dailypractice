import {defineConfig, devices} from '@playwright/test';
import { loadEnvFile } from 'node:process';

loadEnvFile();

export default defineConfig({
  
  timeout : 30*1000,
  expect :{
    timeout  : 10*1000
  },
  reporter : 'html',
  use:{
    browserName : 'chromium',
    trace : 'on',
    headless : true
  },
  projects:[
    {
      name : 'daily',
      testDir : './dailypractice'
    },
    {
      name : 'test',
      testDir : './tests'
    }
  ]
});
