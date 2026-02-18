import { Locator, Page, expect } from "@playwright/test";

export class ToasterNotification {
    notificationBox: Locator;
    loginBtn: Locator;
    registerBtn: Locator;
    viewCartBtn: Locator;
    checkoutBtn: Locator;
    loginLink: Locator;
    wishListLink: Locator;
    registerLink: Locator;
    shoppingCartLink: Locator;
    closeBtn: Locator;
    productIcon: Locator;
    addingToWishlistWithoutLoginNotificationText: Locator;
    addedToCartSuccessNotificationText: Locator;
    page: Page;

    constructor(page: Page) {
        this.page = page;
        this.notificationBox = page.locator('#notification-box-top')
        this.loginBtn = this.notificationBox.getByRole('link', { name: 'Login ' });
        this.registerBtn = this.notificationBox.getByRole('link', { name: 'Register ' });
        this.viewCartBtn = this.notificationBox.getByRole('link', { name: 'View Cart ' });
        this.checkoutBtn = this.notificationBox.getByRole('link', { name: 'Checkout ' });
        this.loginLink = this.notificationBox.getByRole('link', { name: 'login', exact: true });
        this.wishListLink = this.notificationBox.getByRole('link', { name: 'wish list' });
        this.registerLink = this.notificationBox.getByRole('link', { name: 'create an account' });
        this.shoppingCartLink = this.notificationBox.getByRole('link', { name: 'shopping cart' });
        this.closeBtn = this.notificationBox.getByRole('button', { name: 'Close' });
        this.productIcon = this.notificationBox.locator('.img-thumbnail.mr-2');
        this.addingToWishlistWithoutLoginNotificationText = this.notificationBox.getByText('You must login or create an');
        this.addedToCartSuccessNotificationText = this.notificationBox.getByText('Success: You have added');
    }

    escapeRegExp(string: string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    async closeNotification(){
        await this.closeBtn.click()
    }

    async proceedToCheckout() {
        await this.checkoutBtn.click();
    }

    async expectAddingToWishlistWithoutLoginNotificationText(productName: string) {
        await expect(this.addingToWishlistWithoutLoginNotificationText)
            .toHaveText(`You must login or create an account to save ${productName} to your wish list!`);
    }

    async expectAddedToCartSuccessNotificationText(productName: string) {
        await expect(this.addedToCartSuccessNotificationText)
            .toHaveText(`Success: You have added ${productName} to your shopping cart!`);
    }

    async expectNotificationBoxVisibility(){
        await expect(this.notificationBox).toBeVisible();
    }

    async expectShoppingCartLinkEnabled(){
        await expect(this.shoppingCartLink).toBeVisible();
        await expect(this.shoppingCartLink).toBeEnabled();
    } 

    async expectViewCartBtnEnabled(){
        await expect(this.viewCartBtn).toBeVisible();
        await expect(this.viewCartBtn).toBeEnabled();
    }

    async expectCheckoutBtnEnabled(){
        await expect(this.checkoutBtn).toBeVisible();
        await expect(this.checkoutBtn).toBeEnabled();
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

    async expectAddedToCartSuccessNotificationContents(productName: string) {
        await this.expectNotificationBoxVisibility();
        await this.expectShoppingCartLinkEnabled();
        await this.expectViewCartBtnEnabled();
        await this.expectCheckoutBtnEnabled();
        await this.expectAddedToCartSuccessNotificationText(productName);
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