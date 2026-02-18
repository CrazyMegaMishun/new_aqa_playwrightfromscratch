import { test, expect } from '@playwright/test';
import { ListWithProductsPage } from '../lambdaTestPages/listWithProductsPage';
import { ToasterNotification } from '../lambdaTestPages/toasterNotification';

test('Adding product to favorites without login @func @lambdatest', async ({ page }) => {
    
    const listWithProductsPage = new ListWithProductsPage(page);
    const toasterNotification = new ToasterNotification(page);
    const productName = 'iPod Shuffle';

    await test.step('Step 1: Navigate to Ecommerce Playground Products Page', async () => {
        await page.goto('/index.php?route=product/category&path=57');
    });

    await test.step('Step 3: Attempt to add a product to favorites and verify alert toaster', async () => {
        await listWithProductsPage.hoverProduct(productName)
        await listWithProductsPage.addToWishList(productName)
        await toasterNotification.expectAddingToWishlistWithoutLoginNotificationContents(productName)
    });

});
