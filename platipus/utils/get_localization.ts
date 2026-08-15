import { APIRequestContext, expect } from '@playwright/test';

export async function getLocalization(
        gameName: string,
        version: string,
        domen: string,
        request: APIRequestContext
    ): Promise<any> {
    const url = `https://qa.platipusgaming.cloud/${gameName}/${version}/assets/locales/${domen}.json`;
    const response = await request.get(url);

    expect(response.ok(), `Failed to fetch localization from ${url}`).toBeTruthy();

    return await response.json();
}