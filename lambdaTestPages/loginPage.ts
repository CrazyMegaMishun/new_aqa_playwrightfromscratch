import { Locator, Page, expect } from '@playwright/test';

export class LoginPage {

    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly alertMessage: Locator;
    page: Page;

    constructor(page: Page) { 
        this.page = page;
        this.emailInput = page.locator('#input-email');
        this.passwordInput = page.locator('#input-password');
        this.loginButton = page.getByRole('button', { name: 'Login' });
        this.alertMessage = page.locator('#account-login > div.alert.alert-danger.alert-dismissible');
    }

    async inputCredentials(email: string, password: string) {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
    }

    async submitLogin() {
        await this.loginButton.click();
    }

    async verifyErrorMessage() {
        await expect(this.alertMessage).toBeVisible();
        await expect(this.alertMessage).toContainText(/No match for E-Mail Address||exceeded the number of login attempts/i);
    }

}