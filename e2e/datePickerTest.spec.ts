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
    await expect(dateField).toBeVisible();
    await dateField.click();

    // After clicking the date field, the date picker should appear. We can verify that it is visible.
    const datePicker = iFrame.locator('#ui-datepicker-div');
    await expect(datePicker).toBeVisible();

    // Now we can select a specific date. For example, let's select the 15th of the current month.
    const dayOfThisMonth = datePicker.locator('a', { hasText: '15' });
    await dayOfThisMonth.click();


    // After selecting the date, we can verify that the date field has been updated with the selected date.
    const selectedDate = await dateField.inputValue();
    const currentDate = new Date();
    const expectedDate = `0${currentDate.getMonth() + 1}/15/${currentDate.getFullYear()}`;
    await expect(selectedDate).toBe(expectedDate);

  });

  await test.step('Step 3: Identify the date picker element and pick a date of previous month', async () => {
    const iFrame = page.frameLocator(' [class="demo-frame"] ' );
    
    const dateField = iFrame.locator('#datepicker');
    await expect(dateField).toBeVisible();
    await dateField.click();

    const datePicker = iFrame.locator('#ui-datepicker-div');
    await expect(datePicker).toBeVisible();

    const previousMonthButton = datePicker.locator('.ui-datepicker-prev');
    await previousMonthButton.click();

    const dayOfPreviousMonth = datePicker.locator('a', { hasText: '15' });
    await dayOfPreviousMonth.click();

    const selectedDate = await dateField.inputValue();
    const currentDate = new Date();
    const expectedDate = `0${currentDate.getMonth()}/15/${currentDate.getFullYear()}`;
    await expect(selectedDate).toBe(expectedDate);

  });

});