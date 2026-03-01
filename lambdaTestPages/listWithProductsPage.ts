import { Locator, Page, expect } from "@playwright/test";

export class ListWithProductsPage {
    readonly dropDownSortMenu: Locator
    readonly dropDownShowItemsMenu: Locator    
    page: Page;

    constructor(page: Page) {
        this.page = page;
        this.dropDownSortMenu = this.page.locator('#input-sort-212434');
        this.dropDownShowItemsMenu = this.page.locator('#input-limit-212433');
    }

    async selectSorting(optionText: string) {
        await this.dropDownSortMenu.selectOption(optionText);
    }

    async verifySorting(optionText: string) {
        await expect(this.dropDownSortMenu.locator('option:checked')).toHaveText(optionText);
    }

    async selectShowing(optionText: string) {
        await this.dropDownShowItemsMenu.selectOption(optionText);
    }

    async verifyShowing(optionText: string) {
        await expect(this.dropDownShowItemsMenu.locator('option:checked')).toHaveText(optionText);
    }

    getProductLink(productName: string): Locator {
        return this.page.getByRole('link', { name: productName }).first();
    }

    getProductCard(productName: string): Locator {
        return this.page
            .locator('.product-thumb')
            .filter({ has: this.getProductLink(productName) });
    }

    getWishListButton(productName: string): Locator {
        return this.getProductCard(productName)
            .locator('button[title="Add to Wish List"]');
    }

    getAddToCartButton(productName: string): Locator {
        return this.getProductCard(productName)
            .locator('button[title="Add to Cart"]');
    }

    async hoverProduct(productName: string) {
        const link = this.getProductLink(productName);
        await link.hover();
    }

    async addToWishList(productName: string) {
        await this.hoverProduct(productName);
        const btn = this.getWishListButton(productName);
        await btn.click({ force: true });
    }

    async addToCart(productName: string) {
        await this.hoverProduct(productName);
        const btn = this.getAddToCartButton(productName);
        await btn.click({ force: true });
    }

}