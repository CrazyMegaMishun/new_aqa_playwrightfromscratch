import { test, expect } from '@playwright/test';
import { DatePickerPage } from '../jquerryTestPoligonPages/datePickerPage';

test('Testing datepicking in all range datepicker @jqueryui', async ({ page }) => {
  
  const datePickerPage = new DatePickerPage(page);

  await test.step('Step 1: Go to datepicker ui webpage', async () => {
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

  await test.step('Step 5: Check date fill function after choosing the date manualy', async () => {
   
    await datePickerPage.fillDateField('04/16/2024')
    await datePickerPage.expectDateFieldHasData('04/16/2024')
  })

  await test.step('Step 6: Switch to Animated calendar', async () => {
    await datePickerPage.clickWithAnimation();
    //написать тесты на верификацию анимации
  });

  await test.step('Step 7: Switch to Other months calendar', async () => {
    await datePickerPage.clickOtherMonths();
    await datePickerPage.clickDateField();

    const beforeChange = await datePickerPage.getCurrentDate()

    await datePickerPage.openDatePickerWithOtherDays()
    await datePickerPage.selectOtherMonthDay()

    await expect(await datePickerPage.getCurrentDate()).not.toBe(beforeChange)
  });
  
  await test.step('Step 8: Switch to Week of Year calendar', async () => {
    await datePickerPage.clickWeekOfYear();
  });

  await test.step('Step 9: Switch to Non-strict date range calendar', async () => {  
    await datePickerPage.clickdateRangeNonStrict();
    await datePickerPage.clickRangeFrom();
    await datePickerPage.selectFirstDate('15');
    await datePickerPage.clickRangeTo();
    await datePickerPage.selectSecondDate('20');

  });

  await test.step('Step 10: Check emptying first Date Field after choosing date in past', async () => {
    await datePickerPage.clickdateRangeNonStrict();
    await datePickerPage.fillFirstDateField('04/15/2026')
    await datePickerPage.fillSecondDateField('03/01/2026')
    await datePickerPage.page.keyboard.press('Tab')
    await datePickerPage.expectFirstDateFieldEmpty()
   });

  await test.step('Step 11: Check selecting restricted date in restricted calendar', async () => {
    await datePickerPage.clickDateRangeStrict()
    await datePickerPage.clickDateField()
    await datePickerPage.openDatePickerWithOtherDays()
    await datePickerPage.selectOtherMonthDay()
    await datePickerPage.expectDateFieldIsEmpry()
  });

  await test.step('Step 12: Check datepicking in datepicker with dropdown menus', async () => {
    await datePickerPage.clickDropDownMenusDatePicker()
    await datePickerPage.clickDateField()
    await datePickerPage.selectMonth('Mar')
    await datePickerPage.selectYear('2024')
    await datePickerPage.selectFirstDate('1')
    await datePickerPage.expectDateFieldHasData('03/01/2024')
  });

});
