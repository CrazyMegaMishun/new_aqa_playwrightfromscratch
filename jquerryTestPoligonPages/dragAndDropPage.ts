import { Locator, Page, FrameLocator, expect } from '@playwright/test';

export class DragAndDropPage {
    readonly iFrame: FrameLocator;
    readonly draggable: Locator;
    readonly droppable: Locator;
    page: Page;
    
    constructor(page: Page) {
        this.page = page;
        this.iFrame = page.frameLocator(' [class="demo-frame"] ' );
        this.draggable = this.iFrame.locator(' [id="draggable"] ');
        this.droppable = this.iFrame.locator(' [id="droppable"] ');
    }

    async checkDrop() {
        await this.draggable.dragTo(this.droppable);
    }

    async verifyDrop() {
        await expect(this.droppable).toHaveText('Dropped!');
    }

}