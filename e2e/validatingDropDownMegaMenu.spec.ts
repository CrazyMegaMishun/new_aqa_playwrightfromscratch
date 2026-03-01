import { test, expect } from '@playwright/test';
import { MainPage } from '../lambdaTestPages/mainPage'
import { ListWithProductsPage } from '../lambdaTestPages/listWithProductsPage';

test.beforeEach(async ({ page }) => {
    //console.log('Starting test: validatingDropDownMegaMenu.spec.ts');
    await page.goto('/index.php?route=common/home');
    await expect(page).toHaveURL('https://ecommerce-playground.lambdatest.io/index.php?route=common/home');
});

test.afterAll(() => {
    //console.log('Finished test: validatingDropDownMegaMenu.spec.ts');
});

test('Validating Drop Down Mega Menu @lambdatest', async ({ page }) => {

    const mainPage = new MainPage(page);
    const listWithProductsPage = new ListWithProductsPage(page);
    const dropDownSortMenuContents = [
            'Default', 'Best sellers', 'Popular', 'Newest', 
            'Name (A - Z)', 'Name (Z - A)', 
            'Price (Low > High)', 'Price (High > Low)', 
            'Rating (Highest)', 'Rating (Lowest)', 
            'Model (A - Z)', 'Model (Z - A)'
        ];
    const dropDownShowItemsMenuContents = [
            '15', '25', '50', '75', '100'
        ];

    await test.step('Step 1: Hover the Mega Menu button', async () => {
        await mainPage.hoverMegaMenuBtn();
        await mainPage.clickCategoryButton('Apple')
    });

    await test.step('Step 3: Validate the dropdown sort menu contents', async () => {
        for (const optionText of dropDownSortMenuContents) {
            await listWithProductsPage.selectSorting(optionText)
            await listWithProductsPage.verifySorting(optionText)
        }  
    });

    await test.step('Step 4: Validate the dropdown show items menu contents', async () => {
        for (const optionText of dropDownShowItemsMenuContents) {
            await listWithProductsPage.selectShowing(optionText)
            await listWithProductsPage.verifyShowing(optionText)
        }  
    });

});