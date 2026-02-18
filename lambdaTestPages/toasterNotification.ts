import { Locator, Page, expect } from "@playwright/test";

export class ToasterNotification {
    notificationBox: Locator;
    loginBtn: Locator;
    registerBtn: Locator;
    loginLink: Locator;
    wishListLink: Locator;
    registerLink: Locator;
    closeBtn: Locator;
    productIcon: Locator;
    addingToWishlistWithoutLoginNotificationText: Locator;
    page: Page;

    constructor(page: Page) {
        this.page = page;
        this.notificationBox = page.locator('#notification-box-top')
        this.loginBtn = this.notificationBox.getByRole('link', { name: 'Login ' });
        this.registerBtn = this.notificationBox.getByRole('link', { name: 'Register ' });
        this.loginLink = this.notificationBox.getByRole('link', { name: 'login', exact: true });
        this.wishListLink = this.notificationBox.getByRole('link', { name: 'wish list' });
        this.registerLink = this.notificationBox.getByRole('link', { name: 'create an account' });
        this.closeBtn = this.notificationBox.getByRole('button', { name: 'Close' });
        this.productIcon = this.notificationBox.locator('.img-thumbnail.mr-2');
        this.addingToWishlistWithoutLoginNotificationText = this.notificationBox.getByText('You must login or create an');
    }

    escapeRegExp(string: string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    async expectAddingToWishlistWithoutLoginNotificationText(productName: string) {
        await expect(this.addingToWishlistWithoutLoginNotificationText).toHaveText(
            new RegExp(`You must login or create an account to save\\s+${this.escapeRegExp(productName)}\\s+to your wish list!`)
        );
    }

    async expectNotificationBoxVisibility(){
        await expect(this.notificationBox).toBeVisible();
    }

    async expectLoginBtnEnabled(){
        await expect(this.loginBtn).toBeVisible();
        await expect(this.loginBtn).toBeEnabled();
    }

    async expectRegisterBtnEnabled(){
        await expect(this.registerBtn).toBeVisible();
        await expect(this.registerBtn).toBeEnabled();
    }
    
    async expectLoginLinkEnabled(){
        await expect(this.loginLink).toBeVisible();
        await expect(this.loginLink).toBeEnabled();
    }

    async expectRegisterLinkEnabled(){
        await expect(this.registerLink).toBeVisible();
        await expect(this.registerLink).toBeEnabled();
    }

    async expectWishlistLinkEnabled(){
        await expect(this.wishListLink).toBeVisible();
        await expect(this.wishListLink).toBeEnabled();
    }

    async expectCloseBtnEnabled(){
        await expect(this.closeBtn).toBeVisible();
        await expect(this.closeBtn).toBeEnabled();
    } 

    async expectProductIconEnabled(){
        await expect(this.productIcon).toBeVisible();
    } 

    async expectAddingToWishlistWithoutLoginNotificationContents(productName: string) {
        await this.expectNotificationBoxVisibility();
        await this.expectLoginBtnEnabled();
        await this.expectRegisterBtnEnabled()
        await this.expectLoginLinkEnabled()
        await this.expectWishlistLinkEnabled()
        await this.expectRegisterLinkEnabled()
        await this.expectCloseBtnEnabled()
        await this.expectProductIconEnabled()
        await this.expectAddingToWishlistWithoutLoginNotificationText(productName);
    }

}