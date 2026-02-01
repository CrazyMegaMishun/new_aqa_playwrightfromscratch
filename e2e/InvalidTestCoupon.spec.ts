import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  console.log('Starting test: InvalidTestCoupon.spec.ts');
    await page.goto('/index.php?route=common/home');
    await expect(page).toHaveURL('https://ecommerce-playground.lambdatest.io/index.php?route=common/home');
});

test.afterAll(() => {
  console.log('Finished test: InvalidTestCoupon.spec.ts');
});

test('Checking invalid coupon code', async ({ page }) => {
  
  await test.step('Step 1: Hover to HTC Touch HD Product Page', async () => {
    await page.getByRole('button', { name: 'Shop by Category' }).click();
    await page.getByRole('link', { name: 'Components' }).click();
    await page.getByRole('link', { name: 'HTC Touch HD HTC Touch HD HTC' }).hover({timeout: 30000});
  });


  await test.step('Step 2: Click on Add to Cart button', async () => {
    const addToCart = page.getByTitle('Add to Cart').first();
    await addToCart.hover();
    await expect(addToCart).toBeVisible({timeout: 40000});
    await expect(addToCart).toBeEnabled({timeout: 40000});
    await addToCart.click({ trial: true });
    await addToCart.click({ force: true});
  });


  await test.step('Step 3: Navigate to Checkout Page', async () => {
    await expect(page.getByRole('link', { name: 'Checkout ' })).toBeVisible({timeout: 30000});  
    await page.getByRole('link', { name: 'Checkout ' }).click();
  });
  
  await test.step('Step 4: Apply Invalid Coupon Code and Verify Warning Message', async () => {
    await page.locator('.ml-auto.fas.fa-plus').first().click();
    await page.getByRole('textbox', { name: 'Enter your coupon here' }).click();
    await page.getByRole('textbox', { name: 'Enter your coupon here' }).fill('Test');
    await page.getByRole('button', { name: 'Apply Coupon' }).click();
    await expect(page.getByText('Warning: Coupon is either')).toBeVisible();
    await expect(page.locator('#collapse-coupon')).toContainText('Warning: Coupon is either invalid, expired or reached its usage limit! ×');
  });
});