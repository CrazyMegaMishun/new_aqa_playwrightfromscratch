import { test, expect } from '@playwright/test';
import { GamePage } from '../../../pages/game_page';
import { PortalPage } from '../../../pages/portal_page';
import { ApiClient } from '../../../pages/settings_page';

test.describe('Lobby Button Mobile Check', () => {
    const gameToTest = 'Volcano Coins';
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

    test('Mobile Check: Desktop + Mobile (Page), PayTable on Start, Hide History, Reality Check', async({ page }) => {
        const portalPage = new PortalPage(page);
        const apiClient = new ApiClient(page.request);

        await test.step('Login to portal', async () => {
            await portalPage.openLogin();
            await portalPage.login('ktaud003', '123');
        });

        await test.step('Configure API for Desktop + Mobile mode', async () => {
            await apiClient.requestSettings(sharedSessionId, {
                realityCheck: 10,
                paytableOnStart: true,
                hideHistory: true,
                lobbyButtonMobile: true,
                lobbyButtonDesktop: true,
            });
        });

        await test.step('Open game in Page mode -> Verify Paytable on Start -> Verify History absence in menu -> Verify Home button works', async () => {
            await portalPage.searchGame(gameToTest);
            await portalPage.hoverGame(gameToTest);
            await portalPage.openGame();

            let gamePage = new GamePage(page);
            await gamePage.startGame();
            await gamePage.checkPaytableOnStartOpened();
            await gamePage.checkHistoryAbsence();
            await gamePage.clickHome();
        });
    })

    test('Mobile Check: Desktop + Mobile (iFrame), PayTable on Start, Hide History, Reality Check', async({ page }) => {
        const portalPage = new PortalPage(page);
        const apiClient = new ApiClient(page.request);

        await test.step('Login to portal', async () => {
            await portalPage.openLogin();
            await portalPage.login('ktaud003', '123');
        });

        await test.step('Configure API for Desktop + Mobile mode', async () => {
            await apiClient.requestSettings(sharedSessionId, {
                realityCheck: 10,
                paytableOnStart: true,
                hideHistory: true,
                lobbyButtonMobile: true,
                lobbyButtonDesktop: true,
            });
        });

        await test.step('Open Game in iFrame mode -> Verify Home button is absent in Mobile mode', async () => {
            await portalPage.openModeMenu();
            await portalPage.selectDisplayMode('iFrame')
            await portalPage.closeModeMenu();

            await portalPage.searchGame(gameToTest);
            await portalPage.hoverGame(gameToTest);
            await portalPage.openGame();

            let gamePage = new GamePage(page);
            await gamePage.startGame();
            await gamePage.checkPaytableOnStartOpened();
            await gamePage.checkHistoryAbsence();
            await gamePage.checkHomeButtonAbsence();
        });
    })

    test('Mobile Check: Desktop iFrame + Mobile iFrame (Page), AutoPlay Off', async({ page }) => {
        const portalPage = new PortalPage(page);
        const apiClient = new ApiClient(page.request);

        await test.step('Login to portal', async () => {
            await portalPage.openLogin();
            await portalPage.login('ktaud003', '123');
        });

        await test.step('Configure API for Desktop iFrame + Mobile iFrame mode', async () => {
            await apiClient.requestSettings(sharedSessionId, {
                autoPlay: false,
                lobbyButtonDesktopIframe: true,
                lobbyButtonMobileIframe: true,
            });
        });

        await test.step('Open game in Page mode mode and verify Home button is absent', async () => {
            await portalPage.searchGame(gameToTest);
            await portalPage.hoverGame(gameToTest);
            await portalPage.openGame();

            let gamePage = new GamePage(page);
            await gamePage.startGame();
            await gamePage.checkAutoplayIsOff();
            await gamePage.openGameMenu();
            await gamePage.openInfo();
            await gamePage.checkAutoplayTextAbsence();
            await gamePage.checkHomeButtonAbsence();
        });
    })

    test('Mobile Check: Desktop iFrame + Mobile iFrame (iFrame), AutoPlay Off', async({ page }) => {
        const portalPage = new PortalPage(page);
        const apiClient = new ApiClient(page.request);

        await test.step('Login to portal', async () => {
            await portalPage.openLogin();
            await portalPage.login('ktaud003', '123');
        });

        await test.step('Configure API for Desktop iFrame + Mobile iFrame mode', async () => {
            await apiClient.requestSettings(sharedSessionId, {
                autoPlay: false,
                lobbyButtonDesktopIframe: true,
                lobbyButtonMobileIframe: true,
            });
        });

        await test.step('Open Game in iFrame mode and verify Home button works in Mobile iFrame mode', async () => {
            await portalPage.openModeMenu();
            await portalPage.selectDisplayMode('iFrame')
            await portalPage.closeModeMenu();

            await portalPage.searchGame(gameToTest);
            await portalPage.hoverGame(gameToTest);
            await portalPage.openGame();

            let gamePage = new GamePage(page);
            await gamePage.startGame();
            await gamePage.openGameMenu();
            await gamePage.openInfo();
            await gamePage.checkAutoplayTextAbsence();
            await gamePage.clickHome();
        });
    })

    test('Mobile Check: Desktop + Desktop iFrame, Mobile + Mobile iFrame (Page), Buy Feature Off', async ({ page }) => {
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
                buyFeature: false,
            });
        });

        await test.step('Open game in Page mode -> Verify Autoplay is Off -> Verify Autoplay text absence -> Verify Home button works', async () => {
            await portalPage.searchGame(gameToTest);
            await portalPage.hoverGame(gameToTest);
            await portalPage.openGame();

            let gamePage = new GamePage(page);
            await gamePage.startGame();
            await gamePage.checkBuyFeatureIsOff();
            await gamePage.openGameMenu();
            await gamePage.checkBuyBonusTextPaytableAbsence();
            await gamePage.openInfo();
            await gamePage.checkBuyBonusTextInfoAbsence();
            await gamePage.clickHome();
        });
    })

    test('Mobile Check: Desktop + Desktop iFrame, Mobile + Mobile iFrame (iFrame), Buy Feature Off', async ({ page }) => {
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
                buyFeature: false,
            });
        });

        await test.step('Open Game in iFrame mode and verify Home button works in Mobile iFrame mode', async () => {
            await portalPage.openModeMenu();
            await portalPage.selectDisplayMode('iFrame')
            await portalPage.closeModeMenu();

            await portalPage.searchGame(gameToTest);
            await portalPage.hoverGame(gameToTest);
            await portalPage.openGame();

            let gamePage = new GamePage(page);
            await gamePage.startGame();
            await gamePage.openGameMenu();
            await gamePage.checkBuyBonusTextPaytableAbsence();
            await gamePage.openInfo();
            await gamePage.checkBuyBonusTextInfoAbsence();
            await gamePage.clickHome();
        });
    })

    test('Mobile Check: Desktop + Desktop iFrame (Page), Turbo Spin Off', async({ page }) => {
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
                turboSpin: false,
            });
        });

        await test.step('Open game in Page mode -> Verify Home button is absent -> Verify Turbo Spin Off', async () => {
            await portalPage.searchGame(gameToTest);
            await portalPage.hoverGame(gameToTest);
            await portalPage.openGame();

            let gamePage = new GamePage(page);
            await gamePage.startGame();
            await gamePage.checkTurboSpinIsOf();
            await gamePage.openGameMenu();
            await gamePage.checkHomeButtonAbsence();
            await gamePage.openInfo();
            await gamePage.checkTurboSpinTextAbsence();
            await page.goBack();
        });

    })

    test('Mobile Check: Desktop + Desktop iFrame (iFrame), Turbo Spin Off', async({ page }) => {
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
            });
        });

        await test.step('Open Game in iFrame mode and verify Home button is absent in Desktop iFrame mode', async () => {
            await portalPage.openModeMenu();
            await portalPage.selectDisplayMode('iFrame')
            await portalPage.closeModeMenu();

            await portalPage.searchGame(gameToTest);
            await portalPage.hoverGame(gameToTest);
            await portalPage.openGame();

            let gamePage = new GamePage(page);
            await gamePage.startGame();
            await gamePage.openGameMenu();
            await gamePage.checkHomeButtonAbsence();
            await page.goBack()
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
            });
        });

        await test.step('Open game in Page mode and verify Home button is absent', async () => {
            await portalPage.searchGame(gameToTest);
            await portalPage.hoverGame(gameToTest);
            await portalPage.openGame();

            let gamePage = new GamePage(page);
            await gamePage.startGame();
            await gamePage.openGameMenu();
            await gamePage.checkHomeButtonAbsence();
            await page.goBack();
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
            });
        });

        await test.step('Open Gamer in iFrame mode and verify Home button works in Mobile iFrame mode', async () => {
            await portalPage.openModeMenu();
            await portalPage.selectDisplayMode('iFrame')
            await portalPage.closeModeMenu();

            await portalPage.searchGame(gameToTest);
            await portalPage.hoverGame(gameToTest);
            await portalPage.openGame();

            let gamePage = new GamePage(page);
            await gamePage.startGame();
            await gamePage.openGameMenu();
            await gamePage.clickHome();
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
            });
        });

        await test.step('Open game in Page mode mode and verify Home button works', async () => {
            await portalPage.searchGame(gameToTest);
            await portalPage.hoverGame(gameToTest);
            await portalPage.openGame();

            let gamePage = new GamePage(page);
            await gamePage.startGame();
            await gamePage.openGameMenu();
            await gamePage.clickHome();
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
            });
        });

        await test.step('Open Game in iFrame mode and verify Home button is absent in Mobile mode', async () => {
            await portalPage.openModeMenu();
            await portalPage.selectDisplayMode('iFrame')
            await portalPage.closeModeMenu();

            await portalPage.searchGame(gameToTest);
            await portalPage.hoverGame(gameToTest);
            await portalPage.openGame();

            let gamePage = new GamePage(page);
            await gamePage.startGame();
            await gamePage.openGameMenu();
            await gamePage.checkHomeButtonAbsence();
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
            });
        });

        await test.step('Open game in Page mode and verify Home button works', async () => {
            await portalPage.searchGame(gameToTest);
            await portalPage.hoverGame(gameToTest);
            await portalPage.openGame();

            let gamePage = new GamePage(page);
            await gamePage.startGame();
            await gamePage.openGameMenu();
            await gamePage.clickHome();
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
            });
        });

        await test.step('Open Game in iFrame mode and verify Home button works in Mobile iFrame mode', async () => {
            await portalPage.openModeMenu();
            await portalPage.selectDisplayMode('iFrame')
            await portalPage.closeModeMenu();

            await portalPage.searchGame(gameToTest);
            await portalPage.hoverGame(gameToTest);
            await portalPage.openGame();

            let gamePage = new GamePage(page);
            await gamePage.startGame();
            await gamePage.openGameMenu();
            await gamePage.clickHome();
        });
    })

});
