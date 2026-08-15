import { test, expect } from '@playwright/test';
import { GamePage } from '../../../pages/game_page';
import { PortalPage } from '../../../pages/portal_page';
import { ApiClient } from '../../../pages/settings_page';

test.describe('Inactivity Pop-up Mobile Check', () => {
    const gameToTest = 'Super Piggy Inferno';
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
    });

    test('Mobile Check: Desktop + Mobile (Page)', async({ page }) => {
        const portalPage = new PortalPage(page);
        const apiClient = new ApiClient(page.request);

        await test.step('Login to portal', async () => {
            await portalPage.openLogin();
            await portalPage.login('ktaud003', '123');
        });

        await test.step('Configure API for Desktop + Mobile mode', async () => {
            await apiClient.requestSettings(sharedSessionId, {
                inactionTimeout: 1,
                lobbyButtonMobile: true,
                lobbyButtonDesktop: true,
            });
        });

        await test.step('Open game in Page mode -> Verify Inactivity Pop-up', async () => {
            await portalPage.searchGame(gameToTest);
            await portalPage.hoverGame(gameToTest);
            await portalPage.openGame();

            let gamePage = new GamePage(page);
            await gamePage.startGame();
            await gamePage.waitForInactivityPopup(62000);
            await gamePage.exitInactivityPopup();
        });
    })

    test('Mobile Check: Desktop + Mobile (iFrame)', async({ page }) => {
        const portalPage = new PortalPage(page);
        const apiClient = new ApiClient(page.request);

        await test.step('Login to portal', async () => {
            await portalPage.openLogin();
            await portalPage.login('ktaud003', '123');
        });

        await test.step('Configure API for Desktop + Mobile mode', async () => {
            await apiClient.requestSettings(sharedSessionId, {
                inactionTimeout: 1,
                lobbyButtonMobile: true,
                lobbyButtonDesktop: true,
            });
        });

        await test.step('Open game in iFrame mode -> Verify Exit Button absence', async () => {
            await portalPage.openModeMenu();
            await portalPage.selectDisplayMode('iFrame')
            await portalPage.closeModeMenu();

            await portalPage.searchGame(gameToTest);
            await portalPage.hoverGame(gameToTest);
            await portalPage.openGame();
            
            let gamePage = new GamePage(page);
            await gamePage.startGame();
            await gamePage.waitForInactivityPopup(62000);
            await gamePage.checkInactivityPopUpExitAbsence();
        });
    })

    test('Mobile Check: Desktop iFrame + Mobile iFrame (Page)', async({ page }) => {
        const portalPage = new PortalPage(page);
        const apiClient = new ApiClient(page.request);

        await test.step('Login to portal', async () => {
            await portalPage.openLogin();
            await portalPage.login('ktaud003', '123');
        });

        await test.step('Configure API for Desktop iFrame + Mobile iFrame mode', async () => {
            await apiClient.requestSettings(sharedSessionId, {
                lobbyButtonDesktopIframe: true,
                lobbyButtonMobileIframe: true,
                inactionTimeout: 1,
            });
        });

        await test.step('Open game in Page mode mode -> Verify Exit Button absence', async () => {
            await portalPage.searchGame(gameToTest);
            await portalPage.hoverGame(gameToTest);
            await portalPage.openGame();

            let gamePage = new GamePage(page);
            await gamePage.startGame();
            await gamePage.waitForInactivityPopup(62000);
            await gamePage.checkInactivityPopUpExitAbsence();
        });

    })

    test('Mobile Check: Desktop iFrame + Mobile iFrame (iFrame)', async({ page }) => {
        const portalPage = new PortalPage(page);
        const apiClient = new ApiClient(page.request);

        await test.step('Login to portal', async () => {
            await portalPage.openLogin();
            await portalPage.login('ktaud003', '123');
        });

        await test.step('Configure API for Desktop iFrame + Mobile iFrame mode', async () => {
            await apiClient.requestSettings(sharedSessionId, {
                lobbyButtonDesktopIframe: true,
                lobbyButtonMobileIframe: true,
                inactionTimeout: 1,
            });
        });

        await test.step('Open game in iFrame mode -> Verify Inactivity Pop-up', async () => {
            await portalPage.openModeMenu();
            await portalPage.selectDisplayMode('iFrame')
            await portalPage.closeModeMenu();
            await portalPage.searchGame(gameToTest);
            await portalPage.hoverGame(gameToTest);
            await portalPage.openGame();

            let gamePage = new GamePage(page);
            await gamePage.startGame();
            await gamePage.waitForInactivityPopup(62000);
            await gamePage.exitInactivityPopup();
        });
    })

    test('Mobile Check: Desktop + Desktop iFrame, Mobile + Mobile iFrame (Page)', async ({ page }) => {
        const portalPage = new PortalPage(page);
        const apiClient = new ApiClient(page.request);

        await test.step('Login to portal', async () => {
            await portalPage.openLogin();
            await portalPage.login('ktaud003', '123');
        });

        await test.step('Configure API for all modes (Desktop + Desktop iFrame + Mobile + Mobile iFrame)', async () => {
            await apiClient.requestSettings(sharedSessionId, {
                lobbyButtonDesktop: true,
                lobbyButtonDesktopIframe: true,
                lobbyButtonMobile: true,
                lobbyButtonMobileIframe: true,
                inactionTimeout: 1,
            });
        });

        await test.step('Open game in Page mode -> Verify Reality Check', async () => {
            await portalPage.searchGame(gameToTest);
            await portalPage.hoverGame(gameToTest);
            await portalPage.openGame();

            let gamePage = new GamePage(page);
            await gamePage.startGame();
            await gamePage.waitForInactivityPopup(62000);
            await gamePage.exitInactivityPopup();
        });

    })

    test('Mobile Check: Desktop + Desktop iFrame, Mobile + Mobile iFrame (iFrame)', async ({ page }) => {
        const portalPage = new PortalPage(page);
        const apiClient = new ApiClient(page.request);

        await test.step('Login to portal', async () => {
            await portalPage.openLogin();
            await portalPage.login('ktaud003', '123');
        });

        await test.step('Configure API for all modes (Desktop + Desktop iFrame + Mobile + Mobile iFrame)', async () => {
            await apiClient.requestSettings(sharedSessionId, {
                lobbyButtonDesktop: true,
                lobbyButtonDesktopIframe: true,
                lobbyButtonMobile: true,
                lobbyButtonMobileIframe: true,
                inactionTimeout: 1,
            });
        });

        await test.step('Open Game iFrame mode -> Verify Inactivity Pop-up', async () => {
            await portalPage.openModeMenu();
            await portalPage.selectDisplayMode('iFrame')
            await portalPage.closeModeMenu();

            await portalPage.searchGame(gameToTest);
            await portalPage.hoverGame(gameToTest);
            await portalPage.openGame();

            let gamePage = new GamePage(page);
            await gamePage.startGame();
            await gamePage.waitForInactivityPopup(62000);
            await gamePage.exitInactivityPopup();
        });
    })

    test('Mobile Check: Desktop + Desktop iFrame (Page)', async({ page }) => {
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
                inactionTimeout: 1,
            });
        });

        await test.step('Open game in Page mode -> Verify Exit Button absence', async () => {
            await portalPage.searchGame(gameToTest);
            await portalPage.hoverGame(gameToTest);
            await portalPage.openGame();

            let gamePage = new GamePage(page);
            await gamePage.startGame();
            await gamePage.waitForRealityCheck(62000);
            await gamePage.checkRealityCheckExitAbsence();
        });
    })

    test('Mobile Check: Desktop + Desktop iFrame (iFrame)', async({ page }) => {
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
                inactionTimeout: 1,
            });
        });

        await test.step('Open Game in iFrame mode -> Verify Exit Button absence', async () => {
            await portalPage.openModeMenu();
            await portalPage.selectDisplayMode('iFrame')
            await portalPage.closeModeMenu();
            await portalPage.searchGame(gameToTest);
            await portalPage.hoverGame(gameToTest);
            await portalPage.openGame();

            let gamePage = new GamePage(page);
            await gamePage.startGame();
            await gamePage.waitForInactivityPopup(62000);
            await gamePage.checkInactivityPopUpExitAbsence();
        });
    })

    test('Mobile Check: Desktop + Mobile iFrame (Page)', async({ page }) => {
        const portalPage = new PortalPage(page);
        const apiClient = new ApiClient(page.request);

        await test.step('Login to portal', async () => {
            await portalPage.openLogin();
            await portalPage.login('ktaud003', '123');
        });

        await test.step('Configure API for Desktop + Mobile iFrame mode', async () => {
            await apiClient.requestSettings(sharedSessionId, {
                lobbyButtonDesktop: true,
                lobbyButtonMobileIframe: true,
                inactionTimeout: 1
            });
        });

        await test.step('Open game in Page mode -> Verify Exit Button absencet', async () => {
            await portalPage.searchGame(gameToTest);
            await portalPage.hoverGame(gameToTest);
            await portalPage.openGame();

            let gamePage = new GamePage(page);
            await gamePage.startGame();
            await gamePage.waitForInactivityPopup(62000);
            await gamePage.checkInactivityPopUpExitAbsence();
        });

    })
    
    test('Mobile Check: Desktop + Mobile iFrame (iFrame)', async({ page }) => {
        const portalPage = new PortalPage(page);
        const apiClient = new ApiClient(page.request);

        await test.step('Login to portal', async () => {
            await portalPage.openLogin();
            await portalPage.login('ktaud003', '123');
        });

        await test.step('Configure API for Desktop + Mobile iFrame mode', async () => {
            await apiClient.requestSettings(sharedSessionId, {
                lobbyButtonDesktop: true,
                lobbyButtonMobileIframe: true,
                inactionTimeout: 1
            });
        });

        await test.step('Open Game in iFrame mode -> Verify Inactivity Pop-up', async () => {
            await portalPage.openModeMenu();
            await portalPage.selectDisplayMode('iFrame')
            await portalPage.closeModeMenu();
            await portalPage.searchGame(gameToTest);
            await portalPage.hoverGame(gameToTest);
            await portalPage.openGame();

            let gamePage = new GamePage(page);
            await gamePage.startGame();
            await gamePage.waitForInactivityPopup(62000);
            await gamePage.exitInactivityPopup();
        });
    })

    test('Mobile Check: Desktop iFrame + Mobile (Page)', async({ page }) => {
        const portalPage = new PortalPage(page);
        const apiClient = new ApiClient(page.request);

        await test.step('Login to portal', async () => {
            await portalPage.openLogin();
            await portalPage.login('ktaud003', '123');
        });

        await test.step('Configure API for Desktop iFrame + Mobile mode', async () => {
            await apiClient.requestSettings(sharedSessionId, {
                lobbyButtonDesktopIframe: true,
                lobbyButtonMobile: true,
                inactionTimeout: 1
            });
        });

        await test.step('Open game in Page mode mode -> Verify Inactivity Pop-up', async () => {
            await portalPage.searchGame(gameToTest);
            await portalPage.hoverGame(gameToTest);
            await portalPage.openGame();

            let gamePage = new GamePage(page);
            await gamePage.startGame();
            await gamePage.waitForInactivityPopup(62000);
            await gamePage.exitInactivityPopup();
        });
    })

    test('Mobile Check: Desktop iFrame + Mobile (iFrame)', async({ page }) => {
        const portalPage = new PortalPage(page);
        const apiClient = new ApiClient(page.request);

        await test.step('Login to portal', async () => {
            await portalPage.openLogin();
            await portalPage.login('ktaud003', '123');
        });

        await test.step('Configure API for Desktop iFrame + Mobile mode', async () => {
            await apiClient.requestSettings(sharedSessionId, {
                lobbyButtonDesktopIframe: true,
                lobbyButtonMobile: true,
                inactionTimeout: 1
            });
        });

        await test.step('Open Game in iFrame mode -> Verify Exit Button absence', async () => {
            await portalPage.openModeMenu();
            await portalPage.selectDisplayMode('iFrame')
            await portalPage.closeModeMenu();
            await portalPage.searchGame(gameToTest);
            await portalPage.hoverGame(gameToTest);
            await portalPage.openGame();

            let gamePage = new GamePage(page);
            await gamePage.startGame();
            await gamePage.waitForInactivityPopup(62000);
            await gamePage.checkInactivityPopUpExitAbsence();
        });
    })

    test('Mobile Check: Mobile + Mobile iFrame (Page)', async({ page }) => {
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
                inactionTimeout: 1
            });
        });

        await test.step('Open game in Page mode -> Verify Exit Button absence', async () => {
            await portalPage.searchGame(gameToTest);
            await portalPage.hoverGame(gameToTest);
            await portalPage.openGame();

            let gamePage = new GamePage(page);
            await gamePage.startGame();
            await gamePage.waitForInactivityPopup(62000);
            await gamePage.checkInactivityPopUpExitAbsence();
        });

    })

    test('Mobile Check: Mobile + Mobile iFrame (iFrame)', async({ page }) => {
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
                inactionTimeout: 1
            });
        });

        await test.step('Open Game iFrame mode -> Verify Exit Button absence', async () => {
            await portalPage.openModeMenu();
            await portalPage.selectDisplayMode('iFrame')
            await portalPage.closeModeMenu();

            await portalPage.searchGame(gameToTest);
            await portalPage.hoverGame(gameToTest);
            await portalPage.openGame();

            let gamePage = new GamePage(page);
            await gamePage.startGame();
            await gamePage.waitForInactivityPopup(62000);
            await gamePage.checkInactivityPopUpExitAbsence();
        });
    })
});
