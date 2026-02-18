import { test, expect } from '@playwright/test';
import { MainPage } from '../lambdaTestPages/mainPage';
import { ListWithProductsPage } from '../lambdaTestPages/listWithProductsPage'
import { ToasterNotification } from '../lambdaTestPages/toasterNotification';

test('Purchase with hover @lambdatest', async ({ page }) => {

  const mainPage = new MainPage(page);
  const listWithProductsPage = new ListWithProductsPage(page);
  const toasterNotification = new ToasterNotification(page);
  const productName = 'iPod Nano';
  
  await test.step('Step 1: Open Shop', async () => {
    await page.goto('/index.php?route=common/home');
    await expect(page).toHaveURL('https://ecommerce-playground.lambdatest.io/index.php?route=common/home');
  });

  await test.step('Step 2: Go to Product Page via Selecting Category in NavBar', async () => {
    await mainPage.clickCategoriesMenu();
    await mainPage.selectCategoryInNavBar('Phone, Tablets & Ipod');
  });

  await test.step('Step 3: Select Product and add it to cart', async () => {
    await listWithProductsPage.hoverProduct(productName);
    await listWithProductsPage.addToCart(productName);
  });

  await test.step('Step 4: Validate Toaster Notification', async () => {
    await toasterNotification.expectAddedToCartSuccessNotificationContents(productName);
  });
  
});