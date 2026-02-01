import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  console.log('Starting test: validatingDropDownMegaMenu.spec.ts');
    await page.goto('/index.php?route=common/home');
    await expect(page).toHaveURL('https://ecommerce-playground.lambdatest.io/index.php?route=common/home');
});

test.afterAll(() => {
  console.log('Finished test: validatingDropDownMegaMenu.spec.ts');
});

test('Validating Drop Down Mega Menu', async ({ page }) => {

    await test.step('Step 1: Hover the Mega Menu button', async () => {
        const megaMenuBtn = await page.getByRole('button', { name: 'Mega Menu' });

        await megaMenuBtn.hover({ timeout: 30000 });
        await expect(megaMenuBtn).toBeVisible({ timeout: 30000 });
        await megaMenuBtn.screenshot({ path: 'screenshots/step1-mega-menu-button.png' });
    });

    await test.step('Step 2: Opening the shop itself', async () => {
        const shopLink = page.getByRole('link', { name: 'Apple', exact: true });
        await shopLink.click( {force: true} )
        await expect(page).toHaveTitle('Apple');
        await expect(page).toHaveURL('https://ecommerce-playground.lambdatest.io/index.php?route=product/manufacturer/info&manufacturer_id=8');
    });

    await test.step('Step 3: Validate the dropdown sort menu contents', async () => {
        const dropDownSortMenu = page.locator('#input-sort-212434')
        const dropDownSortMenuContents = [
            'Default', 'Best sellers', 'Popular', 'Newest', 
            'Name (A - Z)', 'Name (Z - A)', 
            'Price (Low > High)', 'Price (High > Low)', 
            'Rating (Highest)', 'Rating (Lowest)', 
            'Model (A - Z)', 'Model (Z - A)'
        ];

        for (const optionText of dropDownSortMenuContents) {
            await dropDownSortMenu.selectOption(optionText);
            await expect(dropDownSortMenu.locator('option:checked')).toHaveText(optionText);
        }  
    });

    await test.step('Step 4: Validate the dropdown show items menu contents', async () => {
        const dropDownShowItemsMenu = page.locator('#input-limit-212433')
        const dropDownShowItemsMenuContents = [
            '15', '25', '50', '75', '100'];

        for (const optionText of dropDownShowItemsMenuContents) {
            await dropDownShowItemsMenu.selectOption(optionText);
            await expect(dropDownShowItemsMenu.locator('option:checked')).toHaveText(optionText);
        }  
    });

});