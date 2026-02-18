import { test, expect } from '@playwright/test';
import { DragAndDropPage } from '../jquerryTestPoligonPages/dragAndDropPage'

test('Check drag and drop functionality @jqueryui', async ({ page }) => {
  
  const dragAndDropPage = new DragAndDropPage(page);

  await test.step('Step 1: Go to droppable ui webpage', async () => {
    await page.goto('https://jqueryui.com/droppable/');
    await expect(page).toHaveURL('https://jqueryui.com/droppable/');
  });

  await test.step('Step 2: Perform drag and drop action', async () => {
    await dragAndDropPage.checkDrop()
  });

  await test.step('Step 3: Verify Drop', async () => {
    await dragAndDropPage.verifyDrop()
  })

});