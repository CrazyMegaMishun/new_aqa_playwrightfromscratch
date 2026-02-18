import { test, expect } from '@playwright/test';

test('Check drag and drop functionality @jqueryui', async ({ page }) => {
  
  await test.step('Step 1: Go to droppable ui webpage', async () => {
    await page.goto('https://jqueryui.com/droppable/');
    await expect(page).toHaveURL('https://jqueryui.com/droppable/');
  });

  await test.step('Step 2: Perform drag and drop action', async () => {
    const frame = page.frameLocator(' [class="demo-frame"] ' );

    const draggable = frame.locator(' [id="draggable"] ');
    const droppable = frame.locator(' [id="droppable"] ');

    await draggable.dragTo(droppable);
    await expect(droppable).toHaveText('Dropped!');
  });

});