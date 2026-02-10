import { test, expect } from '@playwright/test';

test('Testing datepicking in all range datepicker', async ({ page }) => {
  
  await test.step('Step 1: Go to droppable ui webpage', async () => {
    await page.goto('https://jqueryui.com/datepicker/');
    await expect(page).toHaveURL('https://jqueryui.com/datepicker/');
  });

  await test.step('Step 2: Identify the date picker element and pick a date of this month', async () => {
    // The datepicker is inside an iframe, so we need to switch to it first
    const iFrame = page.frameLocator(' [class="demo-frame"] ' );
    
    // Now we can locate the date field and interact with it
    const dateField = iFrame.locator('#datepicker');
    await dateField.fill('01/15/2024');
  });

});