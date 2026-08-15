import { Locator, Page } from '@playwright/test';
import { getAppRoot, AppRoot } from '../utils/root_locator';

/**
 * Page Object for the Platipus Portal.
 * Provides methods for interacting with the games portal UI.
 */
export class PortalPage {
    readonly page: Page;
    private root: AppRoot | null = null;

    constructor(page: Page) {
        this.page = page;
    }

    /**
     * Lazily initializes the root locator.
     * Handles both iframe and regular page contexts.
     */
    private async getRoot(): Promise<AppRoot> {
        if (!this.root) {
            this.root = await getAppRoot(this.page);
        }
        return this.root;
    }

    // ==================== Search ====================

    async searchGame(gameName: string): Promise<void> {
        const root = await this.getRoot();
        await root.getByRole('searchbox', { name: 'Search games' }).fill(gameName);
    }

    async clickLogo(): Promise<void> {
        const root = await this.getRoot();
        await root.getByRole('img', { name: 'logo' }).click();
    }

    // ==================== Authentication ====================

    async openLogin(): Promise<void> {
        const root = await this.getRoot();
        await root.locator('div').nth(3).click();
    }

    async login(login: string, password: string): Promise<void> {
        const root = await this.getRoot();
        await root.locator('input[type="text"]').fill(login);
        await root.locator('input[type="password"]').fill(password);
        await root.getByRole('button', { name: 'Login' }).click();
    }

    // ==================== Game Actions ====================

    async hoverGame(gameName: string): Promise<void> {
        const root = await this.getRoot();
        await root.getByText(gameName, {exact: true}).hover();
    }

    async openGame(): Promise<void> {
        const root = await this.getRoot();
        await root.getByRole('button', { name: 'Play now' }).first().click();
    }

    async openGameDemo(): Promise<void> {
        const root = await this.getRoot();
        await root.getByRole('button', { name: 'Demo' }).click();
    }

    // ==================== Language Settings ====================

    async selectLanguage(language: string): Promise<void> {
        const root = await this.getRoot();
        await root.locator('div').nth(5).click();
        await root.getByText(language).click();
        await root.locator('.lang-menu_hover__N8T0B').click();
    }

    // ==================== Display Mode Settings ====================

    async openModeMenu(): Promise<void> {
        const root = await this.getRoot();
        await root.getByRole('img').nth(3).click();
    }

    async closeModeMenu(): Promise<void> {
        const root = await this.getRoot();
        await root.locator('.side-menu_hover__khANb').click();
    }

    async selectDisplayMode(mode: DisplayMode): Promise<void> {
        const root = await this.getRoot();
        await root.getByText(mode, { exact: true }).click();
    }

    /**
     * Selects "Without lobby URL" mode.
     * @warning After this action, navigate back through the browser to the games menu.
     */
    async selectWithoutLobbyUrlMode(): Promise<void> {
        const root = await this.getRoot();
        await root.getByText('Without lobby URL').click();
    }

    async selectWithLobbyUrlMode(): Promise<void> {
        const root = await this.getRoot();
        await root.getByText('With lobby URL').click();
    }
}

/** Available display modes for the game frame. */
export type DisplayMode = 'Frame' | 'Full Page' | 'Frame Small' | 'Port Touch' | 'Without lobby URL' | 'With lobby URL' | 'Page' | 'iFrame' ;