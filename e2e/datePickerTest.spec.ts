import { test, expect } from '@playwright/test';
import { DatePickerPage } from '../jquerryTestPoligonPages/datePickerPage';

test('Testing datepicking in all range datepicker', async ({ page }) => {
  
  const datePickerPage = new DatePickerPage(page);

  await test.step('Step 1: Go to droppable ui webpage', async () => {
    await page.goto('https://jqueryui.com/datepicker/');
    await expect(page).toHaveURL('https://jqueryui.com/datepicker/');
  });

  await test.step('Step 2: Pick a date of this month', async () => {
    await datePickerPage.clickDateField();
    await datePickerPage.selectFirstDate('15');
  });

  await test.step('Step 3: Pick a date of previous month', async () => {
    await datePickerPage.clickDateField();
    await datePickerPage.clickPreviousMonth();
    await datePickerPage.selectFirstDate('15');
  });

  await test.step('Step 4: Pick a date of next month', async () => {
    await datePickerPage.clickDateField();
    await datePickerPage.clickNextMonth();
    await datePickerPage.selectFirstDate('15');
  });

  await test.step('Step 5: Switch to Animated calendar', async () => {
    await datePickerPage.clickWithAnimation();
    //написать тесты на верификацию анимаци
  });

  await test.step('Step 6: Switch to Other months calendar', async () => {
    await datePickerPage.clickOtherMonths();
    //написать тесты на верификацию отображения дней других месяцев - верифайнуть что там есьт дни других месяцев и они недоступны на клик
  });

  await test.step('Step 7: Switch to Week of Year calendar', async () => {
    await datePickerPage.clickWeekOfYear();
  });

  await test.step('Step 8: Switch to Non-strict date range calendar', async () => {  
    await datePickerPage.clickdateRangeNonStrict();
    await datePickerPage.clickRangeFrom();
    await datePickerPage.selectFirstDate('15');
    await datePickerPage.clickRangeTo();
    await datePickerPage.selectSecondDate('20');
    //дописать валидацию на кореектный показ месяцев
  });

  await test.step('Step 9: ', async () => {
    //написать тест на попытку выбрать не правильный ренж - от будущего к прошлому и верифицировать что это не работает
   });

});