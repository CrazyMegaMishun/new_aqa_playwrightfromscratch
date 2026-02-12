import { test, expect } from '@playwright/test';

test('Comparing Screenshot for Carousel', async ({ page }) => {
    await test.step('Step 1: Navigate to lambda test mock shop', async () => {
        await page.goto('/');
    });
});