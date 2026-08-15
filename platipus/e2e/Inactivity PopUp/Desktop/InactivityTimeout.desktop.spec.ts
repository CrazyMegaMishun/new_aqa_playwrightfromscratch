import { test, expect } from '@playwright/test';
import { GamePage } from '../../../pages/game_page';
import { PortalPage } from '../../../pages/portal_page';
import { ApiClient } from '../../../pages/settings_page';

test.describe('Desktop Inactivity Pop-Up Check', () => {
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

    test('Desktop Check: Desktop + Mobile (Frame)', async({ page }) => {
        const portalPage = new PortalPage(page);
        const apiClient = new ApiClient(page.request);

        await test.step('Login to portal', async () => {
            await portalPage.openLogin();
            await portalPage.login('ktaud003', '123');
        });

        await test.step('Configure API for Desktop + Mobile mode, PayTable on Start, Hide History', async () => {
            await apiClient.requestSettings(sharedSessionId, {
                inactionTimeout: 1,
                lobbyButtonMobile: true,
                lobbyButtonDesktop: true,
            });
        });

        await test.step('Open game in Frame Mode -> Verify Exit Button absence', async () => {
            await portalPage.searchGame(gameToTest);
            await portalPage.hoverGame(gameToTest);
            await portalPage.openGame();

            let gamePage = new GamePage(page);
            await gamePage.startGame();
            await gamePage.waitForInactivityPopup(62000);
            await gamePage.checkInactivityPopUpExitAbsence();
        });
    })

    test('Desktop Check: Desktop + Mobile (With Lobby Url)', async({ page }) => {
        const portalPage = new PortalPage(page);
        const apiClient = new ApiClient(page.request);

        await test.step('Login to portal', async () => {
            await portalPage.openLogin();
            await portalPage.login('ktaud003', '123');
        });

        await test.step('Configure API for Desktop + Mobile mode, PayTable on Start, Hide History', async () => {
            await apiClient.requestSettings(sharedSessionId, {
                inactionTimeout: 1,
                lobbyButtonMobile: true,
                lobbyButtonDesktop: true,
            });
        });

        await test.step('Open Game in "With lobby URL" mode -> Verify Inactivity Pop-Up Exit Button', async () => {
            await portalPage.openModeMenu();
            await portalPage.selectDisplayMode('With lobby URL')
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

    test('Desktop Check: Desktop + Mobile (Without Lobby Url)', async({ page }) => {
        const portalPage = new PortalPage(page);
        const apiClient = new ApiClient(page.request);

        await test.step('Login to portal', async () => {
            await portalPage.openLogin();
            await portalPage.login('ktaud003', '123');
        });

        await test.step('Configure API for Desktop + Mobile mode, PayTable on Start, Hide History', async () => {
            await apiClient.requestSettings(sharedSessionId, {
                inactionTimeout: 1,
                lobbyButtonMobile: true,
                lobbyButtonDesktop: true,
            });
        });

        await test.step('Open Game in "Without lobby URL" mode -> Verify Exit Button absence', async () => {
            await portalPage.openModeMenu();
            await portalPage.selectDisplayMode('Without lobby URL')
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
    
    test('Desktop Check: Desktop iFrame + Mobile iFrame (Frame)', async({ page }) => { 
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
                inactionTimeout: 1,
                realityCheck: 0,
            });
        });

        await test.step('Open Game in Frame mode -> Verify Inactivity Pop-up', async () => {
            await portalPage.searchGame(gameToTest);
            await portalPage.hoverGame(gameToTest);
            await portalPage.openGame();

            let gamePage = new GamePage(page);
            await gamePage.startGame();
            await gamePage.waitForInactivityPopup(62000);
            await gamePage.exitInactivityPopup();
        });

    })

    test('Desktop Check: Desktop iFrame + Mobile iFrame (With Lobby Url)', async({ page }) => { 
        const portalPage = new PortalPage(page);
        const apiClient = new ApiClient(page.request);

        await test.step('Login to portal', async () => {
            await portalPage.openLogin();
            await portalPage.login('ktaud003', '123');
        });

        await test.step('Configure API for Desktop iFrame + Mobile iFrame mode', async () => {
            await apiClient.requestSettings(sharedSessionId, {
                lobbyButtonMobileIframe: true,
                lobbyButtonDesktopIframe: true,
                inactionTimeout: 1,
                realityCheck: 0,
            });
        });

        await test.step('Open Game in "With lobby URL" mode -> Verify Exit Button absence', async () => {
            await portalPage.openModeMenu();
            await portalPage.selectDisplayMode('With lobby URL')
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

    test('Desktop Check: Desktop iFrame + Mobile iFrame (Without Lobby Url)', async({ page }) => { 
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
                inactionTimeout: 1,
                realityCheck: 0,
            });
        });

        await test.step('Open Game in "Without lobby URL" -> Verify Exit Button absence', async () => {
            await portalPage.openModeMenu();
            await portalPage.selectDisplayMode('Without lobby URL')
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

    test('Desktop Check: Desktop + Desktop iFrame, Mobile + Mobile iFrame (Frame)', async ({ page }) => {
        const portalPage = new PortalPage(page);
        const apiClient = new ApiClient(page.request);

        await test.step('Login to portal', async () => {
            await portalPage.openLogin();
            await portalPage.login('ktaud003', '123');
        });

        await test.step('Configure API for all modes (Desktop + Desktop iFrame + Mobile + Mobile iFrame), Inactivity pop-up', async () => {
            await apiClient.requestSettings(sharedSessionId, {
                realityCheck: 0,
                lobbyButtonMobile: true,
                lobbyButtonMobileIframe: true,
                lobbyButtonDesktop: true,
                lobbyButtonDesktopIframe: true,
                inactionTimeout: 1,
            });
        });

        await test.step('open Game in Frame mode -> Verify Inactivity Pop-Up', async () => {
            await portalPage.searchGame(gameToTest);
            await portalPage.hoverGame(gameToTest);
            await portalPage.openGame();

            let gamePage = new GamePage(page);
            await gamePage.startGame();
            await gamePage.waitForInactivityPopup(62000);
            await gamePage.exitInactivityPopup();
        });

    })

    test('Desktop Check: Desktop + Desktop iFrame, Mobile + Mobile iFrame (With Lonny Url)', async ({ page }) => {
        const portalPage = new PortalPage(page);
        const apiClient = new ApiClient(page.request);

        await test.step('Login to portal', async () => {
            await portalPage.openLogin();
            await portalPage.login('ktaud003', '123');
        });

        await test.step('Configure API for all modes (Desktop + Desktop iFrame + Mobile + Mobile iFrame), Inactivity pop-up', async () => {
            await apiClient.requestSettings(sharedSessionId, {
                realityCheck: 0,
                lobbyButtonMobile: true,
                lobbyButtonMobileIframe: true,
                lobbyButtonDesktop: true,
                lobbyButtonDesktopIframe: true,
                inactionTimeout: 1,
            });
        });

        await test.step('Open Game in "With lobby URL" mode -> Verify Inactivity Pop-Up', async () => {
            await portalPage.openModeMenu();
            await portalPage.selectDisplayMode('With lobby URL');
            await portalPage.closeModeMenu();

            await portalPage.hoverGame(gameToTest);
            await portalPage.openGame();

            let gamePage = new GamePage(page);
            await gamePage.startGame();
            await gamePage.waitForInactivityPopup(62000);
            await gamePage.exitInactivityPopup();
        });
    })

    test('Desktop Check: Desktop + Desktop iFrame, Mobile + Mobile iFrame (Without Lobby Url)', async ({ page }) => {
        const portalPage = new PortalPage(page);
        const apiClient = new ApiClient(page.request);

        await test.step('Login to portal', async () => {
            await portalPage.openLogin();
            await portalPage.login('ktaud003', '123');
        });

        await test.step('Configure API for all modes (Desktop + Desktop iFrame + Mobile + Mobile iFrame), Inactivity pop-up', async () => {
            await apiClient.requestSettings(sharedSessionId, {
                realityCheck: 0,
                lobbyButtonMobile: true,
                lobbyButtonMobileIframe: true,
                lobbyButtonDesktop: true,
                lobbyButtonDesktopIframe: true,
                inactionTimeout: 1,
            });
        });

        await test.step(' Open Game in "Without lobby URL" -> Verify Exit Button absence', async () => {
            await portalPage.openModeMenu();
            await portalPage.selectDisplayMode('Without lobby URL');
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

    test('Desktop Check: Desktop + Desktop iFrame (Frame)', async({ page }) => {
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

        await test.step('Open game -> Verify Inactivity Timeout', async () => {
            await portalPage.searchGame(gameToTest);
            await portalPage.hoverGame(gameToTest);
            await portalPage.openGame();

            let gamePage = new GamePage(page);
            await gamePage.startGame();
            await gamePage.waitForInactivityPopup(62000);
            await gamePage.exitInactivityPopup();
        });
    })

    test('Desktop Check: Desktop + Desktop iFrame (With Lobby Url)', async({ page }) => {
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

        await test.step('Open Game in "With lobby URL" mode -> Verify Inactivity Timeout', async () => {
            await portalPage.openModeMenu();
            await portalPage.selectDisplayMode('With lobby URL')
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

    test('Desktop Check: Desktop + Desktop iFrame (Without Lobby Url)', async({ page }) => {
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

        await test.step('Open Game in "Without lobby URL" mode -> Verify Exit Button absence', async () => {
            await portalPage.openModeMenu();
            await portalPage.selectDisplayMode('Without lobby URL')
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

    test('Desktop Check: Desktop + Mobile iFrame (Frame)', async({ page }) => {
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
                realityCheck: 0,
                inactionTimeout: 1,
            });
        });

        await test.step('Open game in Frame mode -> Verify Exit Button absence', async () => {
            await portalPage.searchGame(gameToTest);
            await portalPage.hoverGame(gameToTest);
            await portalPage.openGame();

            let gamePage = new GamePage(page);
            await gamePage.startGame();
            await gamePage.waitForInactivityPopup(62000);
            await gamePage.checkInactivityPopUpExitAbsence();
        });

    })

    test('Desktop Check: Desktop + Mobile iFrame (With Lobby Url)', async({ page }) => {
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
                realityCheck: 0,
                inactionTimeout: 1,
            });
        });

        await test.step('Open Game in "With lobby URL" mode -> Verify Inactivity Pop-up', async () => {
            await portalPage.openModeMenu();
            await portalPage.selectDisplayMode('With lobby URL')
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

    test('Desktop Check: Desktop + Mobile iFrame (Without Lobby Url)', async({ page }) => {
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
                realityCheck: 0,
                inactionTimeout: 1,
            });
        });

        await test.step('Switch to "Without lobby URL" mode -> Verify Exit Button absence', async () => {
            await portalPage.openModeMenu();
            await portalPage.selectDisplayMode('Without lobby URL')
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

    test('Desktop Check: Desktop iFrame + Mobile (Frame)', async({ page }) => {
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
                realityCheck: 0,
                inactionTimeout: 1,
            });
        });

        await test.step('Open game in Frame mode -> Verify Inactivity Pop-up Exit', async () => {
            await portalPage.searchGame(gameToTest);
            await portalPage.hoverGame(gameToTest);
            await portalPage.openGame();

            let gamePage = new GamePage(page);
            await gamePage.startGame();
            await gamePage.waitForInactivityPopup(62000);
            await gamePage.exitInactivityPopup();
        });
    })

    test('Desktop Check: Desktop iFrame + Mobile (With Lobby Url)', async({ page }) => {
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
                realityCheck: 0,
                inactionTimeout: 1,
            });
        });

        await test.step('Open Game in "With lobby URL" mode -> Verify Exit Button absence', async () => {
            await portalPage.openModeMenu();
            await portalPage.selectDisplayMode('With lobby URL')
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

    test('Desktop Check: Desktop iFrame + Mobile (Without Lobby Url)', async({ page }) => {
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
                realityCheck: 0,
                inactionTimeout: 1,
            });
        });

        await test.step('Open Game in "Without lobby URL" mode -> Verify Exit Button absence', async () => {
            await portalPage.openModeMenu();
            await portalPage.selectDisplayMode('Without lobby URL')
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

    test('Desktop Check: Mobile + Mobile iFrame (Frame)', async({ page }) => {
        const portalPage = new PortalPage(page);
        const apiClient = new ApiClient(page.request);

        await test.step('Login to portal', async () => {
            await portalPage.openLogin();
            await portalPage.login('ktaud003', '123');
        });

        await test.step('Configure API for Mobile + Mobile iFrame mode, Inactivity Timeout', async () => {
            await apiClient.requestSettings(sharedSessionId, {
                lobbyButtonMobile: true,
                lobbyButtonMobileIframe: true,
                inactionTimeout: 1,
            });
        });

        await test.step('Open game in Frame mode -> -> Verify Exit Button absence', async () => {
            await portalPage.searchGame(gameToTest);
            await portalPage.hoverGame(gameToTest);
            await portalPage.openGame();

            let gamePage = new GamePage(page);
            await gamePage.startGame();
            await gamePage.waitForInactivityPopup(62000);
            await gamePage.checkInactivityPopUpExitAbsence();
        });
    })

    test('Desktop Check: Mobile + Mobile iFrame (With Lobby Url)', async({ page }) => {
        const portalPage = new PortalPage(page);
        const apiClient = new ApiClient(page.request);

        await test.step('Login to portal', async () => {
            await portalPage.openLogin();
            await portalPage.login('ktaud003', '123');
        });

        await test.step('Configure API for Mobile + Mobile iFrame mode, Inactivity Timeout', async () => {
            await apiClient.requestSettings(sharedSessionId, {
                lobbyButtonMobile: true,
                lobbyButtonMobileIframe: true,
                inactionTimeout: 1,
            });
        });

        await test.step('Open Game in "With lobby URL" mode -> -> Verify Exit Button absence', async () => {
            await portalPage.openModeMenu();
            await portalPage.selectDisplayMode('With lobby URL')
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

    test('Desktop Check: Mobile + Mobile iFrame (Without Lobby Url)', async({ page }) => {
        const portalPage = new PortalPage(page);
        const apiClient = new ApiClient(page.request);

        await test.step('Login to portal', async () => {
            await portalPage.openLogin();
            await portalPage.login('ktaud003', '123');
        });

        await test.step('Configure API for Mobile + Mobile iFrame mode, Inactivity Timeout', async () => {
            await apiClient.requestSettings(sharedSessionId, {
                lobbyButtonMobile: true,
                lobbyButtonMobileIframe: true,
                inactionTimeout: 1,
            });
        });

        await test.step('Open Game in "Without lobby URL" mode -> Verify Exit Button absence', async () => {
            await portalPage.openModeMenu();
            await portalPage.selectDisplayMode('Without lobby URL')
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
