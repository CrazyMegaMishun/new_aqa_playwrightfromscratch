//very good example for page Object Model nececarity 
//I declared the save constants twice in different steps, but the best practice is to declare and import them after

import { test, expect } from '@playwright/test';

test('Testing carousel navigation', async ({ page }) => {
  
  await test.step('Step 1: Navigate to lambda test mock shop', async () => {
    await page.goto('https://ecommerce-playground.lambdatest.io/');
    await expect(page).toHaveURL('https://ecommerce-playground.lambdatest.io/');
  });
    

  await test.step('Step 2: Perform click on a carousel button and verify it change', async () => {
    const carousel = page.locator('#mz-carousel-218380');
    await carousel.hover();

    const activeItem = carousel.locator('.carousel-item.active');
    const initialHref = await activeItem.locator('a').getAttribute('href');
    await expect(activeItem).toBeVisible();

    const previousButton = page.getByRole('button', { name: 'Previous' })
    await previousButton.click();

    await expect.poll(
        async () => carousel.locator('.carousel-item.active a').getAttribute('href')
    ).not.toBe(initialHref);

    const nextButton = page.getByRole('button', { name: 'Next' })
    await nextButton.click();

    await expect.poll(
        async () => carousel.locator('.carousel-item.active a').getAttribute('href')
    ).toBe(initialHref);

  });

  await test.step('Step 3: Perform cycleclick on a carousel', async () => {
    const carousel = page.locator('#mz-carousel-218380');
    await carousel.hover();

    const activeItem = carousel.locator('.carousel-item.active');
    const initialHref = await activeItem.locator('a').getAttribute('href');
    await expect(activeItem).toBeVisible();

    const previousButton = page.getByRole('button', { name: 'Previous' })
    await previousButton.click();
    await previousButton.click();
    await previousButton.click();

    await expect.poll(
        async () => carousel.locator('.carousel-item.active a').getAttribute('href')
    ).toBe(initialHref);

    const nextButton = page.getByRole('button', { name: 'Next' })
    await nextButton.click();
    await nextButton.click();
    await nextButton.click();

    await expect.poll(
        async () => carousel.locator('.carousel-item.active a').getAttribute('href')
    ).toBe(initialHref);
    
  });

});