import { test, expect } from '@playwright/test';

test('Testing datepicking in ranged datepicker', async ({ page }) => {
  
  await test.step('Step 1: Go to droppable ui webpage', async () => {
    await page.goto('https://jqueryui.com/datepicker/');
    await expect(page).toHaveURL('https://jqueryui.com/datepicker/');
  });

  await test.step('Step 2: Move to Date Range iFrame', async () => {
    const dateRangeBtn = page.getByRole('link', { name: 'Select a Date Range' })
    await dateRangeBtn.click();
    await expect(page).toHaveURL('https://jqueryui.com/datepicker/#date-range');
  });

  await test.step('Step 3: Identify the date picker element and pick a date range', async () => {
    // The datepicker is inside an iframe, so we need to switch to it first
    const iFrame = page.frameLocator(' [class="demo-frame"] ' );
    
    // Now we can locate the date field and interact with it
    const fisrtDateField = iFrame.getByRole('textbox', { name: 'From' })
    await expect(fisrtDateField).toBeVisible();
    await fisrtDateField.click();

    // After clicking the date field, the date picker should appear. We can verify that it is visible.
    const datePicker = iFrame.locator('#ui-datepicker-div');
    await expect(datePicker).toBeVisible();
    const fisrtDate = datePicker.locator('a', { hasText: '15' }).first();
    await fisrtDate.click();

    const secondDateField = iFrame.getByRole('textbox', { name: 'To' })
    await expect(secondDateField).toBeVisible();
    await secondDateField.click();
    const secondDate = datePicker.locator('a', { hasText: '15' }).nth(1);
    await secondDate.click();
  });

});