import { test, expect } from '@playwright/test';
import { LoginPage } from '../lambdaTestPages/loginPage';
 
test.beforeEach(async ({ page }) => {
    //console.log('Starting test: testWrongLogin.spec.ts');
    await page.goto('/index.php?route=account/login');
    await expect(page).toHaveURL('https://ecommerce-playground.lambdatest.io/index.php?route=account/login');
});

test.afterAll(() => {
    //console.log('Finished test: testWrongLogin.spec.ts');
});

test('Checking Error with Wrong Credentials @lambdatest', async ({ page }) => {
    const loginPage = new LoginPage(page);
    
    await loginPage.inputCredentials('damelo_mommy', '123456'); 
    await loginPage.submitLogin(); 
    await loginPage.verifyErrorMessage(); 
});