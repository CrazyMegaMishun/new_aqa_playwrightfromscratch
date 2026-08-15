//(позже) Добавить в сервеном файле колл на вытаскивание локализации (пример - https://qa.platipusgaming.cloud/baconsbank/141/assets/locales/pna_en.json) и отрефакторить
//Придумать как получать номер актуальной версии на клиенте (глобально)
//Прогнать на запретные слова полученный обжект
//(Пока в консоль, позже репортом на сайте) Настроить репортинг что бы отправляло фейл в виде ключ-значение с ошибкой 
import { test, expect } from '@playwright/test';
import { getLocalization } from '../../utils/get_localization';
import { GamePage } from '../../pages/game_page';
import { PortalPage } from '../../pages/portal_page';
import { ApiClient } from '../../pages/settings_page';

test.describe('Checking Special Localization Rules (PNA_EN, SO_EN, RTP<94%, MaxWin)', () => {
    const gameName = 'superchargethereels'; // Replace with the actual game name
    const version = '112'; // Replace with the actual version of the game
    const gameToTest = 'Super Charge the Reels'; // Change this to the game you want to test
    let sharedSessionId: string;

    const forbidden_terms = ["bet", "stake", "wager", "cost", "price", "purchase", "buy", "pay", "pays", "payer", "win feature",
                             "slot", "paid", "cash", "money", "bought", "refund", "real", "deposit", "single", "loss",
                             "currency", "credit", "gamble", "funds", "casino", "$", "payways", "pool"];
    
        test.beforeAll(async ({ browser }) => {
            const page = await browser.newPage();
            const apiClient = new ApiClient(page.request);
            sharedSessionId = await apiClient.requestLogin({
                login: "m.okhrymenko@platipusgaming.com",
                password: "ktwGZV6f4guUt1YA"
            });
            await page.close();
        });

    test('Localization Check: PNA_EN', async ( {request} ) => {
        const violations: string[] = [];
        let localization_file = await getLocalization(gameName, version, 'pna_en', request)

        for (const [key, value] of Object.entries(localization_file)) {
            if (key == "CREDITS") continue;
            if (typeof value !== 'string') continue;

            const cleaned = value.toLowerCase()
                .replace(/\{\{.*?\}\}/g, ' ')
                .replace(/\{.*?\}/g, ' ')
                .trim();

            for (const term of forbidden_terms) {
                if (cleaned.includes(term)) {
                    // === Подсветка запрещённого слова ===
                    const highlightedValue = value.replace(
                        new RegExp(`(${term})`, 'gi'), 
                        '🔴$1🔴'
                    );
                    violations.push(`• "${term}" in "${key}": ${highlightedValue}`);
                }
            }
        }

        if (violations.length > 0) {
            const message = [
                `❌ Found ${violations.length} forbidden terms in PNA_EN localization:`,
                ...violations
            ].join('\n');

            expect.soft(false, message).toBe(true);
        }
    });

    test('Localization Check: SO_EN', async ( {request} ) => {
        const violations: string[] = [];
        let localization_file = await getLocalization(gameName, version, 'pna_en', request)

        for (const [key, value] of Object.entries(localization_file)) {
            if (key == "CREDITS") continue;
            if (typeof value !== 'string') continue;

            const cleaned = value.toLowerCase()
                .replace(/\{\{.*?\}\}/g, ' ')
                .replace(/\{.*?\}/g, ' ')
                .trim();

            for (const term of forbidden_terms) {
                if (cleaned.includes(term)) {
                    // === Подсветка запрещённого слова ===
                    const highlightedValue = value.replace(
                        new RegExp(`(${term})`, 'gi'), 
                        '🔴$1🔴'
                    );
                    violations.push(`• "${term}" in "${key}": ${highlightedValue}`);
                }
            }
        }

        if (violations.length > 0) {
            const message = [
                `❌ Found ${violations.length} forbidden terms in PNA_EN localization:`,
                ...violations
            ].join('\n');

            expect.soft(false, message).toBe(true);
        }
    });

    test('Check RTP not higher 94% in Paytable and Info, PNA_EN', async( {page} ) => {
        const portalPage = new PortalPage(page);
        
        await test.step('Login to portal', async () => {
            await page.goto('https://qa.platipusgaming.cloud/lobby/test/index.html#');
            await portalPage.openLogin();
            await portalPage.login('ktaud003', '123');
        });

        await test.step('Open Game -> Verify RTP in Paytable -> Verify RTP in Info', async () => {
            await portalPage.searchGame(gameToTest);
            await portalPage.selectLanguage('PNA_EN');
            await portalPage.hoverGame(gameToTest);
            await portalPage.openGame();

            let gamePage = new GamePage(page);
            await gamePage.startGame();
            await gamePage.openGameMenu();
            await gamePage.checkPaytableRTP();
            await gamePage.openInfo();
            await gamePage.checkPaytableRTP();
        });
    })

    test('Check max win line', async ( {page} ) => {
         const portalPage = new PortalPage(page);
        
        await test.step('Login to portal', async () => {
            await page.goto('https://qa.platipusgaming.cloud/lobby/test/index.html#');
            await portalPage.openLogin();
            await portalPage.login('ktaud003', '123');
        });

        await test.step('Open Game -> Verify RTP in Paytable -> Verify RTP in Info', async () => {
            await portalPage.searchGame(gameToTest);
            await portalPage.selectLanguage('PNA_EN');
            await portalPage.hoverGame(gameToTest);
            await portalPage.openGame();

            let gamePage = new GamePage(page);
            await gamePage.startGame();
            await gamePage.openGameMenu();
            await gamePage.openInfo();
            await gamePage.checkMaxWin();
        });
    })

});