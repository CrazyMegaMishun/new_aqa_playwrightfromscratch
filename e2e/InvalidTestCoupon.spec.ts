import { test, expect } from '@playwright/test';
import { MainPage } from '../lambdaTestPages/mainPage';
import { ProductPage } from '../lambdaTestPages/productPage'
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

test('Checking invalid coupon code', async ({ page }) => {

  const mainPage = new MainPage(page);
  const productPage = new ProductPage(page);
  const toasterNotification = new ToasterNotification(page);
  const cartPage = new CartPage(page);
  const productName = 'HTC Touch HD';
  
  await test.step('Step 1: Go to Product Page via Selecting Category in NavBar', async () => {
    await mainPage.clickCategoriesMenu();
    await mainPage.selectCategoryInNavBar('Components');
  });

  await test.step('Step 2: Select Product and add it to cart', async () => {
    await productPage.hoverProduct(productName);
    await productPage.addToCart(productName);
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