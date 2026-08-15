import { test, expect } from '@playwright/test';
import { GamePage } from '../../../pages/game_page';
import { PortalPage } from '../../../pages/portal_page';
import { ApiClient } from '../../../pages/settings_page';

test.describe('Reality Check Desktop Check', () => {
    const gameToTest = 'Super Piggy Inferno'; // Change this to the game you want to test
    let sharedSessionId: string;

    test.beforeAll(async ({ browser }) => {
        const page = await browser.newPage();
        const apiClient = new ApiClient(page.request);
        sharedSessionId = await apiClient.requestLogin({
            login: "m.okhrymenko@platipusgaming.com",
            password: "ktwGZV6f4guUt1YA"
        });
        await page.close();
    });

    test.beforeEach(async ({ page }) => {
        await page.goto('https://qa.platipusgaming.cloud/lobby/test/index.html#');
        //await page.goto('https://good-luck.plgames.net/lobby/index.html');
    });

    test('Desktop Check: Desktop + Mobile, Reality Check', async({ page }) => { //добавить чек на хайд хистори + поменять степы + в реализи чек нету кнопки экзит
        const portalPage = new PortalPage(page);
        const apiClient = new ApiClient(page.request);

        await test.step('Login to portal', async () => {
            await portalPage.openLogin();
            await portalPage.login('ktaud003', '123');
        });

        await test.step('Configure API for Desktop + Mobile mode, Reality Check 10sec', async () => {
            await apiClient.requestSettings(sharedSessionId, {
                realityCheck: 10,
                lobbyButtonMobile: true,
                lobbyButtonDesktop: true,
            });
        });

        await test.step('Open game -> Verify Exit button is absent in Reality Check', async () => {
            await portalPage.searchGame(gameToTest);
            await portalPage.hoverGame(gameToTest);
            await portalPage.openGame();

            let gamePage = new GamePage(page);
            await gamePage.startGame();
            await gamePage.waitForRealityCheck(11000);
            await gamePage.checkRealityCheckExitAbsence();
        });

        await test.step('Switch to "With lobby URL" mode -> Verify Reality Check Exit button', async () => {
            await portalPage.openModeMenu();
            await portalPage.selectDisplayMode('With lobby URL')
            await portalPage.closeModeMenu();
            await portalPage.searchGame(gameToTest);
            await portalPage.hoverGame(gameToTest);
            await portalPage.openGame();

            let gamePage = new GamePage(page);
            await gamePage.startGame();
            await gamePage.waitForRealityCheck(11000);
            await gamePage.exitRealityCheck();
        });

        await test.step('Switch to "Without lobby URL" mode -> Verify Reality Check Exit absence', async () => {
            await portalPage.openModeMenu();
            await portalPage.selectDisplayMode('Without lobby URL')
            await portalPage.closeModeMenu();
            await portalPage.searchGame(gameToTest);
            await portalPage.hoverGame(gameToTest);
            await portalPage.openGame();

            let gamePage = new GamePage(page);
            await gamePage.startGame();
            await gamePage.waitForRealityCheck(11000);
            await gamePage.checkRealityCheckExitAbsence();
        });
    })

    test('Desktop Check: Desktop iFrame + Mobile iFrame, Reality Check', async({ page }) => { 
        const portalPage = new PortalPage(page);
        const apiClient = new ApiClient(page.request);

        await test.step('Login to portal', async () => {
            await portalPage.openLogin();
            await portalPage.login('ktaud003', '123');
        });

        await test.step('Configure API for Desktop iFrame + Mobile iFrame mode, AutoPlay Off', async () => {
            await apiClient.requestSettings(sharedSessionId, {
                lobbyButtonMobileIframe: true,
                lobbyButtonDesktopIframe: true,
                realityCheck: 10,
            });
        });

        await test.step('Open Game in iFrame mode -> Verify Exit button appearance on reality Check', async () => {
            await portalPage.searchGame(gameToTest);
            await portalPage.hoverGame(gameToTest);
            await portalPage.openGame();

            let gamePage = new GamePage(page);
            await gamePage.startGame();
            await gamePage.waitForRealityCheck(11000);
            await gamePage.exitRealityCheck();
        });

        await test.step('Switch to "With lobby URL" mode -> Verify Home button absence -> Verify Exit on Reality Check absence', async () => {
            await portalPage.openModeMenu();
            await portalPage.selectDisplayMode('With lobby URL')
            await portalPage.closeModeMenu();
            await portalPage.searchGame(gameToTest);
            await portalPage.hoverGame(gameToTest);
            await portalPage.openGame();

            let gamePage = new GamePage(page);
            await gamePage.startGame();
            await gamePage.waitForRealityCheck(11000);
            await gamePage.checkRealityCheckExitAbsence();
            await page.goBack();
        });

        await test.step('Switch to "Without lobby URL" -> Verify Home button absence -> Verify Exit on Reality Check absence ', async () => {
            await portalPage.openModeMenu();
            await portalPage.selectDisplayMode('Without lobby URL')
            await portalPage.closeModeMenu();
            await portalPage.searchGame(gameToTest);
            await portalPage.hoverGame(gameToTest);
            await portalPage.openGame();

            let gamePage = new GamePage(page);
            await gamePage.startGame();
            await gamePage.waitForRealityCheck(11000);
            await gamePage.checkRealityCheckExitAbsence();
        });
    })

    test('Desktop Check: Desktop + Desktop iFrame, Mobile + Mobile iFrame, Reality Check', async ({ page }) => {
        const portalPage = new PortalPage(page);
        const apiClient = new ApiClient(page.request);

        await test.step('Login to portal', async () => {
            await portalPage.openLogin();
            await portalPage.login('ktaud003', '123');
        });

        await test.step('Configure API for all modes (Desktop + Desktop iFrame + Mobile + Mobile iFrame, Full Screen Off, Reality Check 10s)', async () => {
            await apiClient.requestSettings(sharedSessionId, {
                lobbyButtonMobile: true,
                lobbyButtonMobileIframe: true,
                lobbyButtonDesktop: true,
                lobbyButtonDesktopIframe: true,
                realityCheck: 10,
            });
        });

        await test.step('Reopen game -> Verify Reality Check', async () => {
            await portalPage.searchGame(gameToTest);
            await portalPage.hoverGame(gameToTest);
            await portalPage.openGame();

            let gamePage = new GamePage(page);
            await gamePage.startGame();
            await gamePage.waitForRealityCheck(11000);
            await gamePage.exitRealityCheck();
        });

        await test.step('Switch to "With lobby URL" mode -> Verify Reality Check', async () => {
            await portalPage.openModeMenu();
            await portalPage.selectDisplayMode('With lobby URL');
            await portalPage.closeModeMenu();

            await portalPage.hoverGame(gameToTest);
            await portalPage.openGame();

            let gamePage = new GamePage(page);
            await gamePage.startGame();
            await gamePage.waitForRealityCheck(11000);
            await gamePage.exitRealityCheck();
        });

        await test.step('Switch to "Without lobby URL" mode -> Verify Home button is absent -> Verify Reality Check Exit Button absence', async () => {
            await portalPage.openModeMenu();
            await portalPage.selectDisplayMode('Without lobby URL');
            await portalPage.closeModeMenu();

            await portalPage.searchGame(gameToTest);
            await portalPage.hoverGame(gameToTest);
            await portalPage.openGame();

            let gamePage = new GamePage(page);
            await gamePage.startGame();
            await gamePage.waitForRealityCheck(11000);
            await gamePage.checkRealityCheckExitAbsence();
        });
    })

    test('Desktop Check: Desktop + Desktop iFrame, Reality Check', async({ page }) => {
        const portalPage = new PortalPage(page);
        const apiClient = new ApiClient(page.request);

        await test.step('Login to portal', async () => {
            await portalPage.openLogin();
            await portalPage.login('ktaud003', '123');
        });

        await test.step('Configure API for Desktop + Desktop iFrame mode', async () => {
            await apiClient.requestSettings(sharedSessionId, {
                lobbyButtonDesktop: true,
                lobbyButtonDesktopIframe: true,
                realityCheck: 10,
            });
        });

        await test.step('Open game -> Verify Reality Check', async () => {
            await portalPage.searchGame(gameToTest);
            await portalPage.hoverGame(gameToTest);
            await portalPage.openGame();

            let gamePage = new GamePage(page);
            await gamePage.startGame();
            await gamePage.waitForRealityCheck(11000);
            await gamePage.exitRealityCheck();
        });

        await test.step('Switch to "With lobby URL" mode -> Verify Reality Check', async () => {
            await portalPage.searchGame(gameToTest);
            await portalPage.hoverGame(gameToTest);
            await portalPage.openGame();

            let gamePage = new GamePage(page);
            await gamePage.startGame();
            await gamePage.waitForRealityCheck(11000);
            await gamePage.exitRealityCheck();
        });

        await test.step('Switch to "Without lobby URL" mode -> Verify Reality Check Exit Button absence', async () => {
            await portalPage.openModeMenu();
            await portalPage.selectDisplayMode('Without lobby URL')
            await portalPage.closeModeMenu();
            await portalPage.searchGame(gameToTest);
            await portalPage.hoverGame(gameToTest);
            await portalPage.openGame();

            let gamePage = new GamePage(page);
            await gamePage.startGame();
            await gamePage.waitForRealityCheck(11000);
            await gamePage.checkRealityCheckExitAbsence();
        });
    })

    test('Desktop Check: Desktop + Mobile iFrame, Reality Check', async({ page }) => {
        const portalPage = new PortalPage(page);
        const apiClient = new ApiClient(page.request);

        await test.step('Login to portal', async () => {
            await portalPage.openLogin();
            await portalPage.login('ktaud003', '123');
        });

        await test.step('Configure API for Desktop + Mobile iFrame mode', async () => {
            await apiClient.requestSettings(sharedSessionId, {
                lobbyButtonMobileIframe: true,
                lobbyButtonDesktop: true,
                realityCheck: 10,
            });
        });

        await test.step('Open game in iFrame mode -> Verify Reality Check Exit absence', async () => {
            await portalPage.searchGame(gameToTest);
            await portalPage.hoverGame(gameToTest);
            await portalPage.openGame();

            let gamePage = new GamePage(page);
            await gamePage.startGame();
            await gamePage.waitForRealityCheck(11000);
            await gamePage.checkRealityCheckExitAbsence();
            await page.goBack();
        });

        await test.step('Switch to "With lobby URL" mode -> Verify Reality Check', async () => {
            await portalPage.openModeMenu();
            await portalPage.selectDisplayMode('With lobby URL')
            await portalPage.closeModeMenu();
            await portalPage.searchGame(gameToTest);
            await portalPage.hoverGame(gameToTest);
            await portalPage.openGame();

            let gamePage = new GamePage(page);
            await gamePage.startGame();
            await gamePage.waitForRealityCheck(11000);
            await gamePage.exitRealityCheck();
        });

        await test.step('Switch to "Without lobby URL" mode -> Verify Reality Check Esit Button absence', async () => {
            await portalPage.openModeMenu();
            await portalPage.selectDisplayMode('Without lobby URL')
            await portalPage.closeModeMenu();
            await portalPage.searchGame(gameToTest);
            await portalPage.hoverGame(gameToTest);
            await portalPage.openGame();

            let gamePage = new GamePage(page);
            await gamePage.startGame();
            await gamePage.waitForRealityCheck(11000);
            await gamePage.checkRealityCheckExitAbsence();
        });
    })

    test('Desktop Check: Desktop iFrame + Mobile, Reality Check', async({ page }) => {
        const portalPage = new PortalPage(page);
        const apiClient = new ApiClient(page.request);

        await test.step('Login to portal', async () => {
            await portalPage.openLogin();
            await portalPage.login('ktaud003', '123');
        });

        await test.step('Configure API for Desktop iFrame + Mobile mode', async () => {
            await apiClient.requestSettings(sharedSessionId, {
                lobbyButtonMobile: true,
                lobbyButtonDesktopIframe: true,
                realityCheck: 10,
            });
        });

        await test.step('Open game in Desktop iFrame mode -> Verify Reality Check', async () => {
            await portalPage.searchGame(gameToTest);
            await portalPage.hoverGame(gameToTest);
            await portalPage.openGame();

            let gamePage = new GamePage(page);
            await gamePage.startGame();
            await gamePage.waitForRealityCheck(11000);
            await gamePage.exitRealityCheck();
        });

        await test.step('Switch to "With lobby URL" mode -> Verify Reality Check Exit Button absence', async () => {
            await portalPage.openModeMenu();
            await portalPage.selectDisplayMode('With lobby URL')
            await portalPage.closeModeMenu();
            await portalPage.searchGame(gameToTest);
            await portalPage.hoverGame(gameToTest);
            await portalPage.openGame();

            let gamePage = new GamePage(page);
            await gamePage.startGame();
            await gamePage.waitForRealityCheck(11000);
            await gamePage.checkRealityCheckExitAbsence();
            await page.goBack();
        });

        await test.step('Switch to "Without lobby URL" mode -> Verify Reality Check Button absence', async () => {
            await portalPage.openModeMenu();
            await portalPage.selectDisplayMode('Without lobby URL')
            await portalPage.closeModeMenu();
            await portalPage.searchGame(gameToTest);
            await portalPage.hoverGame(gameToTest);
            await portalPage.openGame();

            let gamePage = new GamePage(page);
            await gamePage.startGame();
            await gamePage.waitForRealityCheck(11000);
            await gamePage.checkRealityCheckExitAbsence();
        });
    })

    test('Desktop Check: Mobile + Mobile iFrame, Reality Check', async({ page }) => {
        const portalPage = new PortalPage(page);
        const apiClient = new ApiClient(page.request);

        await test.step('Login to portal', async () => {
            await portalPage.openLogin();
            await portalPage.login('ktaud003', '123');
        });

        await test.step('Configure API for Mobile + Mobile iFrame mode', async () => {
            await apiClient.requestSettings(sharedSessionId, {
                lobbyButtonMobile: true,
                lobbyButtonMobileIframe: true,
                realityCheck: 10,
            });
        });

        await test.step('Open game in Frame mode -> Verify Reality Check Exit absence', async () => {
            await portalPage.searchGame(gameToTest);
            await portalPage.hoverGame(gameToTest);
            await portalPage.openGame();

            let gamePage = new GamePage(page);
            await gamePage.startGame();
            await gamePage.waitForRealityCheck(11000);
            await gamePage.checkRealityCheckExitAbsence();
            await page.goBack();
        });

        await test.step('Switch to "With lobby URL" mode -> Verify Reality Check Exit absence', async () => {
            await portalPage.openModeMenu();
            await portalPage.selectDisplayMode('With lobby URL')
            await portalPage.closeModeMenu();
            await portalPage.searchGame(gameToTest);
            await portalPage.hoverGame(gameToTest);
            await portalPage.openGame();

            let gamePage = new GamePage(page);
            await gamePage.startGame();
            await gamePage.waitForRealityCheck(11000);
            await gamePage.checkRealityCheckExitAbsence();
            await page.goBack();
        });

        await test.step('Switch to "Without lobby URL" mode -> Verify Reality Check Exit absence', async () => {
            await portalPage.openModeMenu();
            await portalPage.selectDisplayMode('Without lobby URL')
            await portalPage.closeModeMenu();
            await portalPage.searchGame(gameToTest);
            await portalPage.hoverGame(gameToTest);
            await portalPage.openGame();

            let gamePage = new GamePage(page);
            await gamePage.startGame();
            await gamePage.waitForRealityCheck(11000);
            await gamePage.checkRealityCheckExitAbsence();
        });
    })

});
