// example.spec.ts

import { test } from '@playwright/test';

import generateStepDefinitions from './codeGenerator';
import fs from 'fs';
const path = require('path');

let featureFileContent ; 
const featureFiles = fs.readdirSync('features/') ; 


featureFiles.forEach(element => {
  const filePath = path.join('features/', element);
  featureFileContent = fs.readFileSync(filePath, 'utf-8');
});

test('Navigate to Google', async ({ page }) => {
  await generateStepDefinitions(featureFileContent, page)
 
});

