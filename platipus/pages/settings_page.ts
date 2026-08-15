import { APIRequestContext, expect } from '@playwright/test';

export interface GameSettings {
  autoPlay: boolean;
  buyFeature: boolean;
  realityCheck: number; // in seconds
  realityCheckLost: boolean;
  elapsedTime: boolean;
  netWin: boolean;
  historyUrlIFrame: boolean;
  turboSpin: boolean;
  slamStop: boolean;
  quickSpin: boolean;
  quickStop: boolean;
  hideHistory: boolean;
  tableHedging: boolean;
  isAutoSpinsUnlimit: boolean;
  isDisableFullScreen: boolean;
  paytableOnStart: boolean;
  // Lobby button settings
  lobbyButtonMobile: boolean;
  lobbyButtonMobileIframe: boolean;
  lobbyButtonDesktop: boolean;
  lobbyButtonDesktopIframe: boolean;
  // Additional settings
  inactionTimeout: number; // !!counts on BO server in minutes!!
  showRTP: boolean;
  isTotalStakeAutoplay: boolean;
  isDisabledMoneyPopup: boolean;
}

// Default game settings - change here to update all tests
const DEFAULT_SETTINGS: GameSettings = {
  autoPlay: false,
  buyFeature: true,
  realityCheck: 0,
  realityCheckLost: true,
  elapsedTime: true,
  netWin: true,
  historyUrlIFrame: false,
  turboSpin: true,
  slamStop: true,
  quickSpin: true,
  quickStop: true,
  hideHistory: false,
  tableHedging: true,
  isAutoSpinsUnlimit: true,
  isDisableFullScreen: false,
  paytableOnStart: false,
  lobbyButtonMobile: false,
  lobbyButtonMobileIframe: false,
  lobbyButtonDesktop: false,
  lobbyButtonDesktopIframe: false,
  inactionTimeout: 0,
  showRTP: true,
  isTotalStakeAutoplay: true,
  isDisabledMoneyPopup: false
};

export class ApiClient {
  constructor(private request: APIRequestContext) {}

  // ==================== Login ====================

  async requestLogin(credentials: any): Promise<string> {
    const login =  await this.request.post('https://api2test.platipusgaming.com/api/auth/login', {
        data: credentials
      });
    expect(login.ok()).toBeTruthy();

    const body = await login.json();
    const sessionId = body.sessionId;
    expect(sessionId).toBeDefined();
    return sessionId;
  }

  // ==================== Logout ====================

  async requestLogout(sessionId: any){
    const login =  await this.request.post('https://api2test.platipusgaming.com/api/auth/logout', {
        data: sessionId
      });
    expect(login.ok()).toBeTruthy();
  }

  // ==================== Settings request builder ====================

  /**
   * Apply game settings via API.
   * @param sessionId - Authentication session ID
   * @param settings - Partial settings object (only specify what you want to change, rest uses defaults)
   */
  async requestSettings(sessionId: string, settings: Partial<GameSettings>) {
    // Merge provided settings with defaults
    const finalSettings = { ...DEFAULT_SETTINGS, ...settings };
    
    const res = await this.request.fetch('https://api2test.platipusgaming.com/game/option', {
      method: 'PUT',
      headers: {
        'x-request-sign': sessionId
      },
      data: {
        "id": "2285",
        "autospin_count": [0,25,50,75,100],
        "autospin_limit_lost": [0.5,0.6,0.7,0.8,0.9,1],
        "autospin_limit_win_hi": [25,50,75,100],
        "autospin_limit_lost_hi": [0.5,0.6,0.7,0.8,0.9,1],
        "autospin_limit_win": [25,50,75,100],
        "limit_time": [5,10,20,30,40,50,60,1440],
        // Flags
        "autoPlay": finalSettings.autoPlay,
        "buyFeature": finalSettings.buyFeature,
        "realityCheck": finalSettings.realityCheck,
        "realityCheckLost": finalSettings.realityCheckLost,
        "realityCheckManualLimits": [1],
        "elapsedTime": finalSettings.elapsedTime,
        "netWin": finalSettings.netWin,
        "historyUrlIFrame": finalSettings.historyUrlIFrame,
        "historyUrl": null,
        "turboSpin": finalSettings.turboSpin,
        "slamStop": finalSettings.slamStop,
        "minSpinTime": 0,
        "quickSpin": finalSettings.quickSpin,
        "quickStop": finalSettings.quickStop,
        "hideHistory": finalSettings.hideHistory,
        "tableHedging": finalSettings.tableHedging,
        "isAutoSpinsUnlimit": finalSettings.isAutoSpinsUnlimit,
        "isDisableFullScreen": finalSettings.isDisableFullScreen,
        "paytableOnStart": finalSettings.paytableOnStart,
        "lobbyButton": {
            "mobile": finalSettings.lobbyButtonMobile,
            "mobileIframe": finalSettings.lobbyButtonMobileIframe,
            "desktop": finalSettings.lobbyButtonDesktop,
            "desktopIframe": finalSettings.lobbyButtonDesktopIframe
        },
        "inactionTimeout": finalSettings.inactionTimeout,
        "showRTP": finalSettings.showRTP,
        "isTotalStakeAutoplay": finalSettings.isTotalStakeAutoplay,
        "isDisabledMoneyPopup": finalSettings.isDisabledMoneyPopup,
        // Flags
        "structureId": "5-83"
      }
    });

    //console.log('Settings update response:', await res.json());

    expect(res.ok()).toBeTruthy();

  }

} 