import { Locator, Page, expect } from "@playwright/test";

export class CartPage {
    readonly couponCodeAccordeon: Locator
    readonly couponCodeTextField: Locator
    readonly couponCodeApply: Locator
    readonly alertMessage: Locator
    readonly closeAlertMessage: Locator
    page: Page;

    constructor (page: Page) {
        this.page = page
        this.couponCodeAccordeon = this.page.getByRole('heading', { name: 'Use Coupon Code' });
        this.couponCodeTextField = this.page.getByRole('textbox', { name: 'Enter your coupon here' });
        this.couponCodeApply = this.page.getByRole('button', { name: 'Apply Coupon' });
        this.alertMessage = this.page.locator('.alert-danger')
        this.closeAlertMessage = this.page.getByRole('button', { name: '×' })
    }

    async openCouponCodeAccordeon() {
        await this.couponCodeAccordeon.click()
    }

    async inputCouponCode(couponCode: string) {
        await this.couponCodeTextField.focus()
        await this.couponCodeTextField.fill(couponCode)
    }

    async applyCouponCode(){
        await this.couponCodeApply.click( { force: true } )
    }

    async verifyCouponAlertMessage() {
        await expect(this.alertMessage).toHaveText(' Warning: Coupon is either invalid, expired or reached its usage limit! ×')
    }

    async closeAlert() {
        await this.closeAlertMessage.click()
    }

}