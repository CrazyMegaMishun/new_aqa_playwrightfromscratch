import { test, expect } from '@playwright/test';
import { GamePage } from '../../../pages/game_page';
import { PortalPage } from '../../../pages/portal_page';
import { ApiClient } from '../../../pages/settings_page';

test.describe('Lobby Button Desktop Check', () => {
    const gameToTest = 'Volcano Coins'; // Change this to the game you want to test
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

    test('Desktop Check: Desktop + Mobile (Frame), PayTable on Start, Hide History', async({ page }) => {
        const portalPage = new PortalPage(page);
        const apiClient = new ApiClient(page.request);

        await test.step('Login to portal', async () => {
            await portalPage.openLogin();
            await portalPage.login('ktaud003', '123');
        });

        await test.step('Configure API for Desktop + Mobile mode, PayTable on Start, Hide History', async () => {
            await apiClient.requestSettings(sharedSessionId, {
                paytableOnStart: true,
                hideHistory: true,
                lobbyButtonMobile: true,
                lobbyButtonDesktop: true,
                realityCheck: 10,
            });
        });

        await test.step('Open game in Frame mode-> Verify Paytable on Start -> Verify History absence in menu -> Verify Home button is absent in Desktop mode', async () => {
            await portalPage.searchGame(gameToTest);
            await portalPage.hoverGame(gameToTest);
            await portalPage.openGame();

            let gamePage = new GamePage(page);
            await gamePage.startGame();
            await gamePage.checkPaytableOnStartOpened();
            await gamePage.checkHomeButtonAbsence();
            await gamePage.checkHistoryAbsence();
            await gamePage.openInfo();
            await gamePage.checkHistoryTextAbsence();
            await gamePage.closeGameMenu();
            await gamePage.waitForRealityCheck(11000);
            await gamePage.checkRealityCheckHistoryAbsence();
        });

    })

    test('Desktop Check: Desktop + Mobile (With Lobby Url), PayTable on Start, Hide History', async({ page }) => {
        const portalPage = new PortalPage(page);
        const apiClient = new ApiClient(page.request);

        await test.step('Login to portal', async () => {
            await portalPage.openLogin();
            await portalPage.login('ktaud003', '123');
        });

        await test.step('Configure API for Desktop + Mobile mode, PayTable on Start, Hide History', async () => {
            await apiClient.requestSettings(sharedSessionId, {
                paytableOnStart: true,
                hideHistory: true,
                lobbyButtonMobile: true,
                lobbyButtonDesktop: true,
                realityCheck: 10,
            });
        });

        await test.step('Open Game in "With lobby URL" mode -> Verify Reality Check Appearance and History Button Absence -> Verify Home button works', async () => {
            await portalPage.openModeMenu();
            await portalPage.selectDisplayMode('With lobby URL')
            await portalPage.closeModeMenu();
            await portalPage.searchGame(gameToTest);
            await portalPage.hoverGame(gameToTest);
            await portalPage.openGame();

            let gamePage = new GamePage(page);
            await gamePage.startGame();
            await gamePage.checkPaytableOnStartOpened();
            await gamePage.checkHistoryAbsence();
            await gamePage.closeGameMenu();
            await gamePage.waitForRealityCheck(11000);
            await gamePage.checkRealityCheckHistoryAbsence();
            await page.goBack();
        });
    })

    test('Desktop Check: Desktop + Mobile (Without Lobby Url), PayTable on Start, Hide History', async({ page }) => { //добавить чек на хайд хистори + поменять степы + в реализи чек нету кнопки экзит
        const portalPage = new PortalPage(page);
        const apiClient = new ApiClient(page.request);

        await test.step('Login to portal', async () => {
            await portalPage.openLogin();
            await portalPage.login('ktaud003', '123');
        });

        await test.step('Configure API for Desktop + Mobile mode, PayTable on Start, Hide History', async () => {
            await apiClient.requestSettings(sharedSessionId, {
                paytableOnStart: true,
                hideHistory: true,
                lobbyButtonMobile: true,
                lobbyButtonDesktop: true,
                realityCheck: 10,
            });
        });

        await test.step('Open Game in "Without lobby URL" mode -> Verify Home button absence', async () => {
            await portalPage.openModeMenu();
            await portalPage.selectDisplayMode('Without lobby URL')
            await portalPage.closeModeMenu();
            await portalPage.searchGame(gameToTest);
            await portalPage.hoverGame(gameToTest);
            await portalPage.openGame();

            let gamePage = new GamePage(page);
            await gamePage.startGame();
            await gamePage.checkPaytableOnStartOpened();
            await gamePage.checkHomeButtonAbsence();
        });
    })

    test('Desktop Check: Desktop iFrame + Mobile iFrame (Frame), AutoPlay Off', async({ page }) => { 
        const portalPage = new PortalPage(page);
        const apiClient = new ApiClient(page.request);

        await test.step('Login to portal', async () => {
            await portalPage.openLogin();
            await portalPage.login('ktaud003', '123');
        });

        await test.step('Configure API for Desktop iFrame + Mobile iFrame mode, AutoPlay Off', async () => {
            await apiClient.requestSettings(sharedSessionId, {
                autoPlay: false,
                lobbyButtonMobileIframe: true,
                lobbyButtonDesktopIframe: true,
            });
        });

        await test.step('Open Game in Frame mode -> Verify Autoplay Button absence -> Verify Home Button Appearance -> Verify Autoplay Text absence', async () => {
            await portalPage.searchGame(gameToTest);
            await portalPage.hoverGame(gameToTest);
            await portalPage.openGame();

            let gamePage = new GamePage(page);
            await gamePage.startGame();
            await gamePage.checkAutoplayIsOff();
            await gamePage.openGameMenu();
            await gamePage.openInfo();
            await gamePage.checkAutoplayTextAbsence();
            await gamePage.clickHome();
        });

    })

    test('Desktop Check: Desktop iFrame + Mobile iFrame (With Lobby Url), AutoPlay Off', async({ page }) => { 
        const portalPage = new PortalPage(page);
        const apiClient = new ApiClient(page.request);

        await test.step('Login to portal', async () => {
            await portalPage.openLogin();
            await portalPage.login('ktaud003', '123');
        });

        await test.step('Configure API for Desktop iFrame + Mobile iFrame mode, AutoPlay Off', async () => {
            await apiClient.requestSettings(sharedSessionId, {
                autoPlay: false,
                lobbyButtonMobileIframe: true,
                lobbyButtonDesktopIframe: true,
            });
        });

        await test.step('Switch to "With lobby URL" mode -> Verify Home button absence', async () => {
            await portalPage.openModeMenu();
            await portalPage.selectDisplayMode('With lobby URL')
            await portalPage.closeModeMenu();
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
            await page.goBack();
        });
    })

    test('Desktop Check: Desktop iFrame + Mobile iFrame (Without Lobby Url), AutoPlay Off', async({ page }) => { 
        const portalPage = new PortalPage(page);
        const apiClient = new ApiClient(page.request);

        await test.step('Login to portal', async () => {
            await portalPage.openLogin();
            await portalPage.login('ktaud003', '123');
        });

        await test.step('Configure API for Desktop iFrame + Mobile iFrame mode, AutoPlay Off', async () => {
            await apiClient.requestSettings(sharedSessionId, {
                autoPlay: false,
                lobbyButtonMobileIframe: true,
                lobbyButtonDesktopIframe: true,
            });
        });

        await test.step('Switch to "Without lobby URL" -> Verify Home button absence', async () => {
            await portalPage.openModeMenu();
            await portalPage.selectDisplayMode('Without lobby URL')
            await portalPage.closeModeMenu();
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

    test('Desktop Check: Desktop + Desktop iFrame, Mobile + Mobile iFrame (Frame), Full Screen Off', async ({ page }) => {
        const portalPage = new PortalPage(page);
        const apiClient = new ApiClient(page.request);

        await test.step('Login to portal', async () => {
            await portalPage.openLogin();
            await portalPage.login('ktaud003', '123');
        });

        await test.step('Configure API for all modes (Desktop + Desktop iFrame + Mobile + Mobile iFrame, Full Screen Off)', async () => {
            await apiClient.requestSettings(sharedSessionId, {
                isDisableFullScreen: true,
                lobbyButtonMobile: true,
                lobbyButtonMobileIframe: true,
                lobbyButtonDesktop: true,
                lobbyButtonDesktopIframe: true,
            });
        });

        await test.step('Open game in Frame mode-> Verify Full Screen Button Absence -> Verify Home button works', async () => {
            await portalPage.searchGame(gameToTest);
            await portalPage.hoverGame(gameToTest);
            await portalPage.openGame();

            let gamePage = new GamePage(page);
            await gamePage.startGame();
            await gamePage.checkIsDisabledFullScreen();
            await gamePage.openGameMenu();
            await gamePage.clickHome();
        });
    })

    test('Desktop Check: Desktop + Desktop iFrame, Mobile + Mobile iFrame (With Lobby Url), Full Screen Off', async ({ page }) => {
        const portalPage = new PortalPage(page);
        const apiClient = new ApiClient(page.request);

        await test.step('Login to portal', async () => {
            await portalPage.openLogin();
            await portalPage.login('ktaud003', '123');
        });

        await test.step('Configure API for all modes (Desktop + Desktop iFrame + Mobile + Mobile iFrame, Full Screen Off)', async () => {
            await apiClient.requestSettings(sharedSessionId, {
                isDisableFullScreen: true,
                lobbyButtonMobile: true,
                lobbyButtonMobileIframe: true,
                lobbyButtonDesktop: true,
                lobbyButtonDesktopIframe: true,
            });
        });

        await test.step('Open Game in "With lobby URL" mode -> Verify Home button works', async () => {
            await portalPage.openModeMenu();
            await portalPage.selectDisplayMode('With lobby URL');
            await portalPage.closeModeMenu();

            await portalPage.searchGame(gameToTest)
            await portalPage.hoverGame(gameToTest);
            await portalPage.openGame();

            let gamePage = new GamePage(page);
            await gamePage.startGame();
            await gamePage.openGameMenu();
            await gamePage.clickHome();
        });
    })

    test('Desktop Check: Desktop + Desktop iFrame, Mobile + Mobile iFrame (Without lobby url), Full Screen Off', async ({ page }) => {
        const portalPage = new PortalPage(page);
        const apiClient = new ApiClient(page.request);

        await test.step('Login to portal', async () => {
            await portalPage.openLogin();
            await portalPage.login('ktaud003', '123');
        });

        await test.step('Configure API for all modes (Desktop + Desktop iFrame + Mobile + Mobile iFrame, Full Screen Off)', async () => {
            await apiClient.requestSettings(sharedSessionId, {
                isDisableFullScreen: true,
                lobbyButtonMobile: true,
                lobbyButtonMobileIframe: true,
                lobbyButtonDesktop: true,
                lobbyButtonDesktopIframe: true,
            });
        });

        await test.step('Open Game in "Without lobby URL" mode -> Verify Home button is absent', async () => {
            await portalPage.openModeMenu();
            await portalPage.selectDisplayMode('Without lobby URL');
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

    test('Desktop Check: Desktop + Desktop iFrame (Frame), Buy Bonus Off, Turbo Spin Off', async({ page }) => {
        const portalPage = new PortalPage(page);
        const apiClient = new ApiClient(page.request);

        await test.step('Login to portal', async () => {
            await portalPage.openLogin();
            await portalPage.login('ktaud003', '123');
        });

        await test.step('Configure API for Desktop + Desktop iFrame mode', async () => {
            await apiClient.requestSettings(sharedSessionId, {
                buyFeature: false,
                lobbyButtonDesktop: true,
                lobbyButtonDesktopIframe: true,
                turboSpin: false,
            });
        });

        await test.step('Open game in Frame Mode -> Verify Buy Bonus Button Absence -> Verify Buy Bonus Text Absence -> Verify Home button works', async () => {
            await portalPage.searchGame(gameToTest);
            await portalPage.hoverGame(gameToTest);
            await portalPage.openGame();

            let gamePage = new GamePage(page);
            await gamePage.startGame();
            await gamePage.checkBuyFeatureIsOff();
            await gamePage.checkTurboSpinIsOf();
            await gamePage.openGameMenu();
            await gamePage.checkBuyBonusTextPaytableAbsence();
            await gamePage.openInfo();
            await gamePage.checkTurboSpinTextAbsence();
            await gamePage.checkBuyBonusTextInfoAbsence();
            await gamePage.clickHome();
        });
    })

    test('Desktop Check: Desktop + Desktop iFrame (With Lobby Url), Buy Bonus Off, Turbo Spin Off', async({ page }) => {
        const portalPage = new PortalPage(page);
        const apiClient = new ApiClient(page.request);

        await test.step('Login to portal', async () => {
            await portalPage.openLogin();
            await portalPage.login('ktaud003', '123');
        });

        await test.step('Configure API for Desktop + Desktop iFrame mode', async () => {
            await apiClient.requestSettings(sharedSessionId, {
                buyFeature: false,
                lobbyButtonDesktop: true,
                lobbyButtonDesktopIframe: true,
                turboSpin: false,
            });
        });

        await test.step('Open Game in "With lobby URL" mode -> Verify Home button works', async () => {
            await portalPage.openModeMenu();
            await portalPage.selectDisplayMode('With lobby URL')
            await portalPage.closeModeMenu();
            await portalPage.searchGame(gameToTest);
            await portalPage.hoverGame(gameToTest);
            await portalPage.openGame();

            let gamePage = new GamePage(page);
            await gamePage.startGame();
            await gamePage.checkAutoplayIsOff();
            await gamePage.openGameMenu();
            await gamePage.checkBuyBonusTextPaytableAbsence();
            await gamePage.openInfo();
            await gamePage.checkBuyBonusTextInfoAbsence();
            await gamePage.clickHome();
        });
    })

    test('Desktop Check: Desktop + Desktop iFrame (Without Lobby Url), Buy Bonus Off, Turbo Spin Off', async({ page }) => {
        const portalPage = new PortalPage(page);
        const apiClient = new ApiClient(page.request);

        await test.step('Login to portal', async () => {
            await portalPage.openLogin();
            await portalPage.login('ktaud003', '123');
        });

        await test.step('Configure API for Desktop + Desktop iFrame mode', async () => {
            await apiClient.requestSettings(sharedSessionId, {
                buyFeature: false,
                lobbyButtonDesktop: true,
                lobbyButtonDesktopIframe: true,
                turboSpin: false,
            });
        });

        await test.step('Open Game in "Without lobby URL" mode and verify Home button is absent', async () => {
            await portalPage.openModeMenu();
            await portalPage.selectDisplayMode('Without lobby URL')
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
            await gamePage.checkHomeButtonAbsence();
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
            });
        });

        await test.step('Open game in Frame mode -> Verify Home button is absent', async () => {
            await portalPage.searchGame(gameToTest);
            await portalPage.hoverGame(gameToTest);
            await portalPage.openGame();

            let gamePage = new GamePage(page);
            await gamePage.startGame();
            await gamePage.openGameMenu();
            await gamePage.openInfo();
            await gamePage.checkHomeButtonAbsence();
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
            });
        });

        await test.step('Open Game in "With lobby URL" mode -> Verify Home button works', async () => {
            await portalPage.openModeMenu();
            await portalPage.selectDisplayMode('With lobby URL')
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
            });
        });

        await test.step('Open Game in "Without lobby URL" mode -> Verify Home button is absent', async () => {
            await portalPage.openModeMenu();
            await portalPage.selectDisplayMode('Without lobby URL')
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
            });
        });

        await test.step('Open game in Frame mode -> Verify Home button works', async () => {
            await portalPage.searchGame(gameToTest);
            await portalPage.hoverGame(gameToTest);
            await portalPage.openGame();

            let gamePage = new GamePage(page);
            await gamePage.startGame();
            await gamePage.openGameMenu();
            await gamePage.clickHome();
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
            });
        });

        await test.step('Open Game in "With lobby URL" mode -> Verify Home button is absent', async () => {
            await portalPage.openModeMenu();
            await portalPage.selectDisplayMode('With lobby URL')
            await portalPage.closeModeMenu();
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
            });
        });

        await test.step('Open Game in "Without lobby URL" mode -> Verify Home button is absent', async () => {
            await portalPage.openModeMenu();
            await portalPage.selectDisplayMode('Without lobby URL')
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

    test('Desktop Check: Mobile + Mobile iFrame (Frame)', async({ page }) => {
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

        await test.step('Open game in Frame mode -> Verify Home button is absent', async () => {
            await portalPage.searchGame(gameToTest);
            await portalPage.hoverGame(gameToTest);
            await portalPage.openGame();

            let gamePage = new GamePage(page);
            await gamePage.startGame();
            await gamePage.openGameMenu();
            await gamePage.checkHomeButtonAbsence();
        });
    })

    test('Desktop Check: Mobile + Mobile iFrame (With Lobby Url)', async({ page }) => {
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

        await test.step('Open Game in "With lobby URL" mode -> Verify Home button is absent', async () => {
            await portalPage.openModeMenu();
            await portalPage.selectDisplayMode('With lobby URL')
            await portalPage.closeModeMenu();
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

    test('Desktop Check: Mobile + Mobile iFrame (Without Lobby Url)', async({ page }) => {
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

        await test.step('Open Game in "Without lobby URL" mode -> Verify Home button is absent', async () => {
            await portalPage.openModeMenu();
            await portalPage.selectDisplayMode('Without lobby URL')
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

});
