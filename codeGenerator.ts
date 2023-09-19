
import { chromium } from '@playwright/test';

import { bundlerModuleNameResolver } from 'typescript';

// Create the Playwright browser instance
const actions = {
  'I go to the login page': async (page) => {
    await page.goto('https://www.google.com/');
  }, 
  'I enter {string} in {string}': async (page, ...args) => {
    const [value, field] = args
    await page.getByRole("textbox", {name: field}).fill(value)
  },
  'I click {string}': async (page, ...args) => {
    const[buttonName] = args 
    await page.getByRole('button', {name: buttonName}).click() ; 
  }, 
  'I wait {string} seconds for the page to load': async (page, ...args) => {
    const[seconds] = args 
    await page.waitForTimeout(seconds*1000) ; 
  }, 
  'I click on the {string} {string}': async (page, ...args) => {
    const [role, name] = args ; 
    await page.getByRole(role, {name: name}).click() ; 
  }
};
// Step definitions generator function
async function generateStepDefinitions(featureFileContent, page) {
  const steps = featureFileContent.split('\n');

  // Define Playwright action functions corresponding to each Gherkin step
  let action
  for (const item of steps) {
    const words = item.split(' ');
    let actionName = words.slice(5).join(' ').trim();
    if (hasQuotes(actionName)) {
      const quotedValues = extractQuotedStrings(actionName)
      actionName = replaceQuotedStringsWithString(actionName)
      if (actions[actionName]) {
        action = actions[actionName] 
        await action(page, ...quotedValues)
      }
    } else  if (actions[actionName]) {
      action = actions[actionName]
      await action(page)
    } 
   
  }
}

function hasQuotes(inputString: string): boolean {
  const quoteRegex = /"(.*?)"/g;
  return quoteRegex.test(inputString);
}

function extractQuotedStrings(inputString: string): string[] {
  const quoteRegex = /("(.*?)")/g;
  const quotedStrings = inputString.match(quoteRegex);
  if (quotedStrings) {
    return quotedStrings.map((value) => value.replace(/"/g, ''));
  } else {
    return [];
  }
}

function replaceQuotedStringsWithString(inputString: string): string[] {
  const quoteRegex = /"(.*?)"/g;
  const quotedStrings = inputString.match(quoteRegex);
  if (quotedStrings) {
    let modifiedString = inputString;
    quotedStrings.forEach((quotedValue) => {
      modifiedString = modifiedString.replace(quotedValue, '{string}');
    });
    return modifiedString.split(',');
  } else {
    return [];
  }
}
export default generateStepDefinitions