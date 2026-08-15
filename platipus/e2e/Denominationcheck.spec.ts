import { test, expect } from '@playwright/test';
import { GamePage } from '../pages/game_page';
import { PortalPage } from '../pages/portal_page';
import { ApiClient } from '../pages/settings_page';

test.describe('Denomination Check', () => {
    //отправка запроса с деномами на бет груп ендпоинт (работает только с апи) (надо написать)
    //логин и получение ключа для инита
    //отправка инита с полученным ключем (инит запрос надо написать)
    //чек респонса, чек поля bet на нужные деномы
    //прокликать на уровне игры ставки с чеком респонса на спин и сменой баланса (учесть что есть выигрыш)
});