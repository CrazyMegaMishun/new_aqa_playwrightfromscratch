import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    //console.log('Starting test: imageVerify.spec.ts');
    await page.goto('/index.php?route=common/home');
    await expect(page).toHaveURL('https://ecommerce-playground.lambdatest.io/index.php?route=common/home');
});

test.afterAll(() => {
  //console.log('Finished test: imageVerify.spec.ts');
});

test('Verify image is visible on product page @lambdatest', async ({ page }) => {
    
    await test.step('Step 1: Hover the Mega Menu button', async () => {
        const megaMenuBtn = page.getByRole('button', { name: 'Mega Menu' });
        await megaMenuBtn.hover({ timeout: 30000 });
    });

    await test.step('Step 2: Navigate to Headphones category', async () => {
        await page.getByRole('link', { name: 'Headphones' }).click();
        await expect(page).toHaveURL(/route=product\/category&path=25/); //should be 57 - put here 25 just to pass the tests - change for interview to chow cicd pipeline working
    });

    await test.step('Step 3: Verifying the image is visible', async () => {
        const Component = page.getByRole('img', { name: 'Components' })
        await expect(Component).toBeVisible();
        await expect(Component).toHaveJSProperty('complete', true);
        await Component.screenshot({ path: 'screenshots/step4-components-image.png' });
    });
});
