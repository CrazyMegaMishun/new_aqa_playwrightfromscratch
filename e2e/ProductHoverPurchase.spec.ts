import { test, expect } from '@playwright/test';
import { MainPage } from '../lambdaTestPages/mainPage';
import { ProductPage } from '../lambdaTestPages/productPage'
import { ToasterNotification } from '../lambdaTestPages/toasterNotification';

test('Checking invalid coupon code', async ({ page }) => {

  const mainPage = new MainPage(page);
  const productPage = new ProductPage(page);
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
    await productPage.hoverProduct(productName);
    await productPage.addToCart(productName);
  });

  await test.step('Step 4: Validate Toaster Notification', async () => {
    await toasterNotification.expectAddedToCartSuccessNotificationContents(productName);
  });
  
});