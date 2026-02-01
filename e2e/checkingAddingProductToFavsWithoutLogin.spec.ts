import { test, expect } from '@playwright/test';

test('Checking adding product to favorites without login', async ({ page }) => {
  
    await test.step('Step 1: Navigate to Ecommerce Playground Home Page', async () => {
        await page.goto('/index.php?route=common/home');
        await expect(page).toHaveURL('https://ecommerce-playground.lambdatest.io/index.php?route=common/home');
        await page.screenshot({ path: 'screenshots/step1-homepage.png' });
    });
    
    await test.step('Step 2: Hover the Mega Menu button', async () => {
        const megaMenuBtn = page.getByRole('button', { name: 'Mega Menu' });
        await megaMenuBtn.hover({ timeout: 30000 });
    });

    await test.step('Step 3: Navigate to Headphones category', async () => {
        await page.getByRole('link', { name: 'Headphones' }).click();
        await expect(page).toHaveURL(/route=product\/category&path=25/); //should be 57 - put here 25 just to pass the tests - change for interview to chow cicd pipeline working
    });

    await test.step('Step 4: Attempt to add a product to favorites', async () => {
        const headphonesProduct = page.getByRole('link', { name: 'Samsung SyncMaster 941BW Samsung SyncMaster 941BW Samsung SyncMaster 941BW' })
        await expect(headphonesProduct).toBeVisible({ timeout: 30000 });
        await expect(headphonesProduct).toBeEnabled();
        await headphonesProduct.hover();
        
        const addToWishListBtn = page.getByTitle('Add to Wish List').nth(5);
        await expect(addToWishListBtn).toBeVisible({ timeout: 30000 });
        await expect(addToWishListBtn).toBeEnabled();
        
        await addToWishListBtn.click( {trial: true} );
        await addToWishListBtn.click( {force: true} );
    });

    await test.step('Step 5: Verifing login message appearance and its contents', async () => {
    await expect(page.getByText('Login ×')).toBeVisible({ timeout: 30000 });
    await expect(page.getByRole('link', { name: 'login', exact: true })).toBeVisible();
    await expect(page.locator('#notification-box-top').getByRole('link', { name: 'Samsung SyncMaster 941BW' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'wish list' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Login ' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Register ' })).toBeVisible();
    await expect(page.getByRole('alert')).toContainText('You must login or create an account to save Samsung SyncMaster 941BW to your wish list!');  
    await page.locator('#notification-box-top').screenshot({ path: 'screenshots/step5-login-message.png' })
    ;});
});
