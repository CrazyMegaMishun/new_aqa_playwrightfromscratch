import { test, expect } from '@playwright/test';

test('Testing Keyboard Actions @lambdatest', async ({ page }) => {
  
  await test.step('Step 1: Navigate to lambda test mock shop', async () => {
    await page.goto('https://ecommerce-playground.lambdatest.io/');
    await expect(page).toHaveURL('https://ecommerce-playground.lambdatest.io/');
  });
    
  await test.step('Step 2: Perform keyboard actions and verify the changes', async () => {
    const searchInput = page.locator('input[name="search"]').first();
    await searchInput.focus();
    await searchInput.fill('laptop');
    await searchInput.press('Enter');
    await expect(page).toHaveURL(/search=laptop/);
  });

  await test.step('Step 3: Clear', async () => {
    const searchInput = page.locator('input[name="search"]').first();
    await searchInput.focus();
    //await searchInput.clear();

    await page.keyboard.press('Control+A');
    await page.keyboard.press('Backspace');

    await expect(searchInput).toBeEmpty();
  });

  await test.step('Step 4: Press Tab', async () => {
    const searchInput = page.locator('input[name="search"]').first();
    await searchInput.focus();
    await page.keyboard.press('Tab');
    await expect(await page.evaluate(() => document.activeElement?.innerHTML)).toBe('Search');
  });


});