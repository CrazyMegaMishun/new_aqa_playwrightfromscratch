import { Locator, Page, expect, request} from '@playwright/test';
import { getAppRoot, AppRoot } from '../utils/root_locator';

/**
 * Page Object for the Platipus Game.
 * Provides methods for interacting with the game UI.
 */
export class GamePage {
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

    // ==================== Game Controls ====================

    async startGame(): Promise<void> {
        const root = await this.getRoot();
        const startButton = root.locator('.npStart').first();
        await startButton.click( );
    }

    async closeGame(): Promise<void> {
        await this.page.locator('span').nth(1).click();
    }

    async switchSpinMode(): Promise<void>{
        const root = await this.getRoot();
        await root.locator('.icon_H9.turboSpinIcon3_ar').click();
    }

    async switchSound(): Promise<void> {
        const root = await this.getRoot();
        await root.locator('.regularButton_uD').nth(5).click();
    }

    async openTotalBetMenu(): Promise<void> {
        const root = await this.getRoot();
        await root.getByText('TOTAL BET').first().click();
    }

    async closeTotalBetMenu(): Promise<void> {
        const root = await this.getRoot();
        await root.locator('.modalClose_N4').click();
    }

    async increaseTotalBet(): Promise<void> {
        const root = await this.getRoot();
        await root.locator('.icon_H9.betIconRight_ye').click();
    }

    async decreaseTotalBet(): Promise<void> {
        const root = await this.getRoot();
        await root.locator('.icon_H9.betIconLeft_zu').click();
    }

    async fullscreenOn(): Promise<void> {
        const root = await this.getRoot();
        const fullScreenButton = root.locator('.icon_H9.fullScreenOffIcon_M2');
        await fullScreenButton.click();
    }

    async fullscreenOff(): Promise<void> {
        const root = await this.getRoot();
        const fullScreenButton = root.locator('.icon_H9.fullScreenOnIcon_6p');
        await fullScreenButton.click();
    }

    // ==================== Autoplay ====================

    async openAutoPlay(): Promise<void> {
        const root = await this.getRoot();
        await root.locator('.icon_H9').first().click();
    }

    async closeAutoPlay(): Promise<void> {
        const root = await this.getRoot();
        await root.locator('.modalClose_N4').click();
    }

    async startAutoplay(): Promise<void> {
        const root = await this.getRoot();
        await root.getByText('START').click();
    }

    async abdruptAutoplay(): Promise<void> {
        const root = await this.getRoot();
        await root.locator('div').filter({ hasText: '23' }).nth(4).click();
    }

    async continueAfterAutoplay(): Promise<void> {
        const root = await this.getRoot();
        await root.getByText('CONTINUE').click();
    }

    // ==================== Game Menu ====================

    async openGameMenu(): Promise<void> {
        const root = await this.getRoot();
        await root.locator('.icon_H9.menuIcon_TA').click();
    }

    async closeGameMenu(): Promise<void> {
        const root = await this.getRoot();
        await root.locator('.modalClose_N4').click();
    }

    async openPaytable(): Promise<void> {
        const root = await this.getRoot();
        await root.locator('div').filter({ hasText: /^Paytable$/ }).first().click();
    }

    async openInfo(): Promise<void> {
        const root = await this.getRoot();
        await root.locator('div').filter({ hasText: /^Info$/ }).first().click();
    }

    async openHistory(): Promise<void> {
        const root = await this.getRoot();
        await root.locator('div').filter({ hasText: /^History$/ }).first().click();
    }

    async openSound(): Promise<void> {
        const root = await this.getRoot();
        await root.locator('div').filter({ hasText: /^Sound$/ }).first().click();
    }

    async clickHome(): Promise<void> {
        const root = await this.getRoot();
        await root.locator('div').filter({ hasText: /^Home$/ }).first().click();
    }

    // ==================== Reality Check ====================

    /**
     * Waits for the reality check popup to appear.
     * @param timeout - Timeout in milliseconds (default: 90000)
     */
    async waitForRealityCheck(timeout: number = 90000): Promise<void> {
        const root = await this.getRoot();
        const popup = root.locator('div').filter({ hasText: 'You have been playing this game for 0 minutes.' }).first();
        await popup.waitFor({ state: 'visible', timeout });
    }

    async continueRealityCheck(): Promise<void> {
        const root = await this.getRoot();
        const popup = root.locator('div').filter({ hasText: 'You have been playing this game for 0 minutes.' }).first();
        await popup.getByText('CONTINUE').click();
    }

    async exitRealityCheck(): Promise<void> {
        const root = await this.getRoot();
        const popup = root.locator('div').filter({ hasText: 'You have been playing this game for 0 minutes.' }).first();
        await popup.getByText('EXIT').click();
    } 

    async openRealityCheckHistory(): Promise<void> {
        const root = await this.getRoot();
        const popup = root.locator('div').filter({ hasText: 'You have been playing this game for 0 minutes.' }).first();
        await popup.getByText('HISTORY').click();
    }

    async checkRealityCheckHistoryAbsence(): Promise<void> {
        const root = await this.getRoot();
        const popup = root.locator('div').filter({ hasText: 'You have been playing this game for 0 minutes.' }).first();
        const historyButton = popup.getByText('HISTORY');
        await expect(historyButton).toHaveCount(0);
    }

    // ==================== Inactivity Pop-Up ====================

    /**
     * Waits for the Inactivity Pop-Up to appear.
     * @param timeout - Timeout here in test in millisecons (default: 60000) but counts in minutes on BO server, so 60000 ms = 1 min on BO server
     */

    async waitForInactivityPopup(timeout: number = 60000): Promise<void> {
        const root = await this.getRoot();
        const popup = root.locator('div').filter({ hasText: 'The session has timed out due to inactivity. Please log in again to continue playing.' }).first();
        await popup.waitFor({ state: 'visible', timeout });
    }

    async exitInactivityPopup(): Promise<void> {
        const root = await this.getRoot();
        const popup = root.locator('div').filter({ hasText: 'The session has timed out due to inactivity. Please log in again to continue playing.' }).first();
        await expect(popup.getByText('EXIT')).toHaveCount(1);
        await popup.getByText('EXIT').click();
    }

    async checkInactivityPopUpExitAbsence(): Promise<void> {
        const root = await this.getRoot();
        const popup = root.locator('div').filter({ hasText: 'The session has timed out due to inactivity. Please log in again to continue playing.' }).first();
        const exitBtn = popup.getByText('EXIT');
        await expect(exitBtn).toHaveCount(0);
    }

    // ==================== Bonus Game ====================

    async openBonusGameMenu(): Promise<void> {
        const root = await this.getRoot();
        await root.locator('.icon_H9.buyIcon_QD').click();
    }

    async closeBonusGameMenu(): Promise<void> {
        const root = await this.getRoot();
        await root.locator('.modalClose_N4').click();
    }

    async decreaseBonusBet(): Promise<void> {
        const root = await this.getRoot();
        await root.locator('.buyBonusBet_fT > .betMenu_Ft > .betDecrease_Z- > .icon_H9').click();
    }

    async increaseBonusBet(): Promise<void> {
        const root = await this.getRoot();
        await root.locator('.buyBonusBet_fT > .betMenu_Ft > .betIncrease_TJ > .icon_H9').click();
    }

    async buyBonusGame(): Promise<void> {
        const root = await this.getRoot();
        await root.getByText('BUY').click();
    }

    // ==================== Verification ====================

    async checkAutoplayIsOff(): Promise<void> {
        const root = await this.getRoot();
        const autoplayButton = root.locator('.autoPlayIcon_Wd');
        await expect(
            autoplayButton.locator('..')
        ).toHaveClass(/invisible_RX/);
    }

    async checkAutoplayTextAbsence(): Promise<void> {
        const root = await this.getRoot();
        const autoplayText = root.getByText('AUTOPLAY ')
        await expect(autoplayText).toHaveCount(0);
    }

    async checkTurboSpinIsOf(): Promise<void> {
        const root = await this.getRoot();
        const turboSpinBtn = root.locator('.icon_H9.turboSpinIcon3_ar');
        await expect(
            turboSpinBtn.locator('..')
        ).toHaveClass(/invisible_RX/);
    }

    async checkTurboSpinTextAbsence(): Promise<void> {
        const root = await this.getRoot();
        const turboSpinBtn = root.getByText('TURBO Click to turn on/off');
        await expect(turboSpinBtn).toHaveCount(0);
    }

    async checkBuyFeatureIsOff(): Promise<void> {
        const root = await this.getRoot();
        const buyFeatureBtn = root.locator('.icon_H9.buyIcon_QD'); 
        await expect(buyFeatureBtn).toHaveCount(0);
    }

    async checkBuyBonusTextPaytableAbsence(): Promise<void> {
        const root = await this.getRoot();
        const buyBonus = root.getByText('BUY BONUS FEATURE', { exact: true })
        if(await buyBonus.count() == 1) await buyBonus.scrollIntoViewIfNeeded()
        await expect(buyBonus).toHaveCount(0);
    }

    async checkBuyBonusTextInfoAbsence(): Promise<void> {
        const root = await this.getRoot();
        const buyBonus = root.getByText('• Buy feature RTP:', { exact: true })
        if(await buyBonus.count() == 1) await buyBonus.scrollIntoViewIfNeeded()
        await expect(buyBonus).toHaveCount(0);
    }

    async checkHomeButtonAbsence(): Promise<void> {
        const root = await this.getRoot();
        const homeButton = root.locator('div').filter({ hasText: /^Home$/ }).first();
        await expect(homeButton).toHaveCount(0);
    }

    async checkPaytableOnStartOpened(): Promise<void> {
        const root = await this.getRoot();
        const paytableHeader = root.getByText('Paytable').nth(1);
        await expect(paytableHeader).toHaveCount(1);
    }

    async checkIsDisabledFullScreen(): Promise<void> {
        const root = await this.getRoot();
        const fullScreenButton = root.locator('.icon_H9.fullScreenOffIcon_M2');
        await expect(fullScreenButton).toHaveCount(0);
    }

    async checkHistoryAbsence(): Promise<void> {
        const root = await this.getRoot();
        const historyOption = root.locator('div').filter({ hasText: /^History$/ }).first();
        await expect(historyOption).toHaveCount(0);
    }

    async checkHistoryTextAbsence(): Promise<void> {
        const root = await this.getRoot();
        const historyText = root.locator('iframe').contentFrame().getByText('HISTORY Click to view your')
    }

    async checkRealityCheckExitAbsence(): Promise<void> {
        const root = await this.getRoot();
        const exitBtn = root.locator('.messageBlock_xF').getByText('EXIT');
        expect(await exitBtn.count()).toBe(0);
    }

    async checkPaytableRTP(): Promise<void>{
        const root = await this.getRoot()
        const rtpBlock = root.locator('.block_cb').filter({
            hasText: /%/
        }).locator('..');

        const text = await rtpBlock.innerText();
        const match = text.match(/(\d{1,2}\.\d{1,2})\s*%/g)?.map(v => parseFloat(v)) ?? [];

        const violations: string[] = [];

        match.forEach((rtp, index) => {
            if (rtp > 94) {
                violations.push(`RTP ${index + 1}: ${rtp}% (превышает 94%)`);
            }
        });

        if (violations.length > 0) {
            const message = [
                `❌ Найдено ${violations.length} RTP выше 94%:`,
                ...violations
            ].join('\n');
            rtpBlock.scrollIntoViewIfNeeded();
            this.page.screenshot( { path: 'rtp_screenshot.png'} )
            expect.soft(false, message).toBe(true);
        } else {
            console.log(`✅ Все RTP значения < 94% (${match.join(', ')})`);
        }
        
    }

    async checkMaxWin(): Promise<void> {
        const root = await this.getRoot()
        const maxWinLine = root.getByText('The maximum win is')
        expect(maxWinLine).not.toBe(0)
    }

    async checkElapsedTime(): Promise<void> {}
    
    async checkNETWin(): Promise<void> {} //дописать чеки на обычные вины, больше выны, и вины с бонусных игр

    async checkMinSpinTime(): Promise<void> {}

}