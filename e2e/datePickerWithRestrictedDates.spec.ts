import { test, expect } from '@playwright/test';

test('Testing datepicking with restircted dates', async ({ page }) => {
  
  await test.step('Step 1: Go to droppable ui webpage', async () => {
    await page.goto('https://jqueryui.com/datepicker/');
    await expect(page).toHaveURL('https://jqueryui.com/datepicker/');
  });

  await test.step('Step 2: Move to Restricted Date iFrame', async () => {
    const dateRangeBtn = page.getByRole('link', { name: 'Restrict date range' })
    await dateRangeBtn.click();
    await expect(page).toHaveURL('https://jqueryui.com/datepicker/#min-max');
  });

  await test.step('Step 3: Identify the date picker element and try to pick a date in the past (should be disabled)', async () => {
    const iFrame = page.frameLocator(' [class="demo-frame"] ' );
    
    const dateField = iFrame.locator('#datepicker')
    await dateField.click();

    const datePicker = iFrame.locator('#ui-datepicker-div');
    const previousMonthButton = datePicker.locator('.ui-datepicker-prev');
    await previousMonthButton.click();

    const dayOfPreviousMonth = datePicker.locator('td.ui-datepicker-unselectable span', { hasText: '1' }).first();
    await expect(dayOfPreviousMonth.locator('..')).toHaveClass(/ui-datepicker-unselectable/);
    await dayOfPreviousMonth.click( {force: true} );

    await expect(dateField).toHaveValue('');
    await expect(datePicker).toBeVisible();
  });

});