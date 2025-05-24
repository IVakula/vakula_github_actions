// @ts-check
import { defineConfig, devices } from '@playwright/test';
import 'dotenv/config';
/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
//import dotenv from 'dotenv';
//import path from 'path';
//dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    baseURL: process.env.BASE_URL,
    //headless: false,
    headless: true,
    httpCredentials: {
      username: process.env.HTTP_CREDENTIAL_USERNAME,
      password: process.env.HTTP_CREDENTIAL_PASSWORD,
    },
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://127.0.0.1:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    { name: 'setup',
      use: { ...devices['Desktop Chromium'], channel: 'chromium' },
      testMatch: /.*\.setup\.js/, testDir: './setup'
    },
    
    {
      name: 'Chromium Setup',
      use: { ...devices['Desktop Chromium'], channel: 'chromium', storageState: 'session-storage.json' },
      dependencies: ['setup']
    },

  ],

});

