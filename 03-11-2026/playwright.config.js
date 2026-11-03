import { defineConfig } from '@playwright/test';
import { loadEnvFile } from 'node:process';

loadEnvFile();

export default defineConfig({
  testDir: './tests',
  reporter: 'html',
  timeout : 30*1000,
  expect : {
    timeout : 10*1000
  },
  
  use: {
    browserName: 'chromium',
    trace: 'on',
    actionTimeout: 10*1000,
    headless : true
  }
});