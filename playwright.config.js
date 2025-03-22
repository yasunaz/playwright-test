import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
   testDir: './scripts',
   timeout: 30_000,
   workers: 1,
   use: {
      headless: false,
      viewport: { width: 1980, height: 1080 },
      actionTimeout: 10_000,
      launchOptions: {
         slowMo: 400,
      },
   },
   reporter: [['html', { outputFolder: 'reports' }]],
   projects: [
      {
         name: 'chrome',
         testMatch: '*tests/*.spec.js',
         use: {
            ...devices['Desktop Chrome'],
            viewport: { width: 1980, height: 1080 },
            trace: 'on',
            screenshot: 'on',
         },
      },
      //   {
      //      name: 'firefox',
      //      testMatch: '*tests/*.spec.js',
      //      use: {
      //         ...devices['Desktop Firefox'],
      //         viewport: { width: 1280, height: 720 },
      //      },
      //   },
      //   {
      //      name: 'safari',
      //      testMatch: '*tests/*.spec.js',
      //      use: {
      //         ...devices['Desktop Safari'],
      //         viewport: { width: 1280, height: 720 },
      //      },
      //   },
   ],
});
