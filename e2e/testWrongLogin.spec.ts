import { test, expect } from '@playwright/test';

test('Checking Error with Wrong Credentials', async ({ page }) => {

  await test.step('Step 1: Navigate to Ecommerce Playground Home Page', async () => {
    await page.goto('/index.php?route=common/home');
    await expect(page).toHaveURL('https://ecommerce-playground.lambdatest.io/index.php?route=common/home');
  });

  await test.step('Hover to My Account Menu', async () => {
    await page.getByRole('button', { name: 'My Account' }).hover({timeout: 30000});
  });

  await test.step('Click on Login button', async () => {
    await page.getByRole('link', { name: 'Login' }).click();
  });


  await test.step('Login with invalid credentials', async () => {
    await page.getByRole('textbox', { name: 'E-Mail Address' }).fill('damelo_mommy');
    await page.getByRole('textbox', { name: 'Password' }).fill('123456');
    await page.getByRole('button', { name: 'Login' }).click();
  });

  await test.step('Confirming the error message is displayed', async () => {
    const alertMessage = page.locator('#account-login > div.alert.alert-danger.alert-dismissible');
    await expect(alertMessage).toBeVisible({timeout: 30000});
    await expect(alertMessage).toContainText(/No match for E-Mail Address||exceeded the number of login attempts/i);
  });

});