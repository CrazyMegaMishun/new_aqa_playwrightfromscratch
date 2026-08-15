// utils/root-locator.ts
import { Page, Locator, FrameLocator } from '@playwright/test';

export type AppRoot = Locator | FrameLocator;

export async function getAppRoot(page: Page): Promise<AppRoot> {
  const iframe = page.locator('iframe').first();

  if (await iframe.count() > 0) {
    await iframe.waitFor({ state: 'visible', timeout: 10000 });
    return page.frameLocator('iframe').locator('body'); // или просто page.frameLocator('iframe')
  }

  return page.locator('body');
}