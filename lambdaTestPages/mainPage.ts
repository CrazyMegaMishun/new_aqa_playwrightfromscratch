import { Locator, Page, expect } from '@playwright/test';

export class MainPage {
    readonly megaMenuButton: Locator;
    page: Page;

    constructor(page: Page) {
        this.megaMenuButton = page.getByRole('button', { name: 'Mega Menu' });
        this.page = page;
    }

    async clickCategoryButton (btnName: string){
        await this.page.getByRole('link', { name: btnName }).click()
    }

    async hoverMegaMenuBtn () {
        await this.megaMenuButton.hover()
    }
}