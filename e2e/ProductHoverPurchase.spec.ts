import { test, expect } from '@playwright/test';

test('Purchase via hovering Product', async ({ page }) => {

  await test.step('Step 1: Navigate to Ecommerce Playground Home Page', async () => {
    await page.goto('/index.php?route=common/home');
    await expect(page).toHaveURL('https://ecommerce-playground.lambdatest.io/index.php?route=common/home');
  });

  await test.step('Step 2: Hover to HTC Touch HD Product Page', async () => {
    await page.getByRole('button', { name: 'Shop by Category' }).click();
    await page.getByRole('link', { name: 'Components' }).click();
    await page.getByRole('link', { name: 'HTC Touch HD HTC Touch HD HTC' }).hover({timeout: 30000});
  });


  await test.step('Step 3: Click on Add to Cart button', async () => {
    const addToCart = page.getByTitle('Add to Cart').first();
    await addToCart.hover();
    await expect(addToCart).toBeVisible({timeout: 40000});
    await expect(addToCart).toBeEnabled({timeout: 40000});
    await addToCart.click({ trial: true });
    await addToCart.click({ force: true});
  });

  await test.step('Step 4: Check added to cart', async () => {
    const notifBoxTop = page.locator('#notification-box-top');
    await expect(notifBoxTop).toBeVisible({timeout: 30000});
    await expect(notifBoxTop).toContainText(/Success: You have added HTC Touch HD/);
  });

});