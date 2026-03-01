import { Locator, Page, expect } from '@playwright/test';

export class MainPage {
    readonly megaMenuBtn: Locator;
    readonly categoryBurgerBtn: Locator;
    readonly navBar: Locator;
    page: Page;

    constructor(page: Page) {
        this.megaMenuBtn = page.getByRole('button', { name: 'Mega Menu' });
        this.categoryBurgerBtn = page.getByRole('button', { name: 'Shop by Category' });
        this.navBar = page.locator('#mz-component-1626147655')
        this.page = page;
    }

    async clickCategoryButton (btnName: string){
        await this.page.getByRole('link', { name: btnName, exact: true }).click();
    }

    async hoverMegaMenuBtn () {
        await this.megaMenuBtn.hover();
    }

    async clickCategoriesMenu() {
        await this.categoryBurgerBtn.click();
    }
    
    async selectCategoryInNavBar(categoryName: string) {
        await this.navBar.getByRole('link', { name: categoryName}).click({ force: true });
    }

}