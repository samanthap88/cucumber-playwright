// example.spec.ts

import { test } from '@playwright/test';

import generateStepDefinitions from './codeGenerator';
import fs from 'fs';

const featureFileContent = fs.readFileSync('example.feature', 'utf-8');

test('Navigate to Google', async ({ page }) => {
  await generateStepDefinitions(featureFileContent, page);

 
});

