import { test, expect } from '@playwright/test';
import { MainPage } from '../lambdaTestPages/mainPage';
import { ListWithProductsPage } from '../lambdaTestPages/listWithProductsPage'
import { ToasterNotification } from '../lambdaTestPages/toasterNotification';
import { CartPage } from '../lambdaTestPages/cartPage';

test.beforeEach(async ({ page }) => {
    //console.log('Starting test: InvalidTestCoupon.spec.ts');
    await page.goto('/index.php?route=common/home');
    await expect(page).toHaveURL('https://ecommerce-playground.lambdatest.io/index.php?route=common/home');
});

test.afterAll(() => {
  //console.log('Finished test: InvalidTestCoupon.spec.ts');
});

test('Checking invalid coupon code @lambdatest', async ({ page }) => {

  const mainPage = new MainPage(page);
  const listWithProductsPage = new ListWithProductsPage(page);
  const toasterNotification = new ToasterNotification(page);
  const cartPage = new CartPage(page);
  const productName = 'HTC Touch HD';
  
  await test.step('Step 1: Go to Product Page via Selecting Category in NavBar', async () => {
    await mainPage.clickCategoriesMenu();
    await mainPage.selectCategoryInNavBar('Components');
  });

  await test.step('Step 2: Select Product and add it to cart', async () => {
    await listWithProductsPage.hoverProduct(productName);
    await listWithProductsPage.addToCart(productName);
  });

  await test.step('Step 3: Navigate to Checkout Page via Toaster Notification', async () => {
    await toasterNotification.expectAddedToCartSuccessNotificationContents(productName);
    await toasterNotification.proceedToCheckout();
  });
  
  await test.step('Step 4: Apply Invalid Coupon Code and Verify Warning Message', async () => {
    await cartPage.openCouponCodeAccordeon();
    await cartPage.inputCouponCode('Test');
    await cartPage.applyCouponCode();
    await cartPage.verifyCouponAlertMessage();
    await cartPage.closeAlert()
  });
});