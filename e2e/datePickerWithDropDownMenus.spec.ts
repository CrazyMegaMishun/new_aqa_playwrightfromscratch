import { test, expect } from '@playwright/test';

test('Testing datepicking in datepicker with dropdown menus', async ({ page }) => {
  
  await test.step('Step 1: Go to droppable ui webpage', async () => {
    await page.goto('https://jqueryui.com/datepicker/');
    await expect(page).toHaveURL('https://jqueryui.com/datepicker/');
  });

  await test.step('Step 2: Move to Drop Down Date iFrame', async () => {
    const dateRangeBtn = page.getByRole('link', { name: 'Display month & year menus' })
    await dateRangeBtn.click();
    await expect(page).toHaveURL('https://jqueryui.com/datepicker/#dropdown-month-year');
  });

  await test.step('Step 3: Identify the date picker element and pick a date via dropdown menus', async () => {
    const iFrame = page.frameLocator(' [class="demo-frame"] ' );
    
    const dateField = iFrame.locator('#datepicker')
    await dateField.click();

    const monthDropdown = iFrame.locator('.ui-datepicker-month');
    const yearDropdown = iFrame.locator('.ui-datepicker-year');
    const datePicker = iFrame.locator('#ui-datepicker-div');

    await monthDropdown.selectOption({ label: 'May' });
    await yearDropdown.selectOption({ label: '2024' });

    const fisrtDate = datePicker.locator('a', { hasText: '15' });
    await fisrtDate.click();
  });

});