// playwright.config.ts

import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  testMatch: ["example.spec.ts"]
};

export default config;
