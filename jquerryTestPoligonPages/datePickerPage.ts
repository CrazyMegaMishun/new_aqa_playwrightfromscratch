import { Locator, Page, FrameLocator, expect } from '@playwright/test';

export class DatePickerPage {
    readonly iFrame: FrameLocator;
    readonly datePicker: Locator;
    readonly dateField: Locator;
    readonly previousMonthButton: Locator;
    readonly nextMonthButton: Locator;
    readonly defaultFunctionality: Locator;
    readonly withAnimation: Locator;
    readonly otherMonths: Locator;
    readonly barButton: Locator;
    readonly displayInline: Locator;
    readonly dropDownMenusDatePicker: Locator;
    readonly multipleMonths: Locator;
    readonly withDateFormat: Locator;
    readonly iconTrigger: Locator;
    readonly localizeCalendar: Locator;
    readonly alternateField: Locator;
    readonly dateRangeStrict: Locator;
    readonly dateRangeNonStrict: Locator;
    readonly weekOfYear: Locator;
    readonly rangeFrom: Locator;
    readonly rangeTo: Locator;
    readonly monthDropdown: Locator;
    readonly yearDropdown: Locator;
    page: Page;

    constructor(page: Page) {
        this.page = page;
        this.iFrame = page.frameLocator(' [class="demo-frame"] ' );
        this.defaultFunctionality = this.page.getByRole('link', { name: 'Default functionality' })
        this.withAnimation = this.page.getByRole('link', { name: 'Animations' });
        this.dateField = this.iFrame.locator('#datepicker');
        this.datePicker = this.iFrame.locator('#ui-datepicker-div');
        this.previousMonthButton = this.datePicker.locator('.ui-datepicker-prev');
        this.nextMonthButton = this.datePicker.locator('.ui-datepicker-next');
        this.defaultFunctionality = this.page.getByRole('link', { name: 'Default functionality' })
        this.otherMonths = this.page.getByRole('link', { name: 'Other months' });
        this.barButton = this.page.getByRole('link', { name: 'Display button bar' });
        this.displayInline = this.page.getByRole('link', { name: 'Display inline' });
        this.dropDownMenusDatePicker = this.page.getByRole('link', { name: 'Display month & year menus' });
        this.multipleMonths = this.page.getByRole('link', { name: 'Display multiple months' });
        this.withDateFormat = this.page.getByRole('link', { name: 'Format date' });
        this.iconTrigger = this.page.getByRole('link', { name: 'Icon trigger' });
        this.localizeCalendar = this.page.getByRole('link', { name: 'Populate alternate field' })
        this.alternateField = this.page.getByRole('link', { name: 'Alternate field' });
        this.dateRangeStrict = this.page.getByRole('link', { name: 'Restrict date range' });
        this.dateRangeNonStrict = this.page.getByRole('link', { name: 'Select a Date Range' })
        this.weekOfYear = this.page.getByRole('link', { name: 'Show week of the year' });
        this.rangeTo = this.iFrame.getByRole('textbox', { name: 'To' });
        this.rangeFrom = this.iFrame.getByRole('textbox', { name: 'From' });
        this.monthDropdown = this.iFrame.locator('.ui-datepicker-month');
        this.yearDropdown = this.iFrame.locator('.ui-datepicker-year');

    }

    async openDatePickerWithOtherDays() {
        for (let i = 0; i<12; i++){
            if (!await this.checkMonthHasOtherDays()) {
                await this.clickNextMonth()
            } else break
        }
    }

    getDayLocator(day: string): Locator {
        return this.datePicker.locator('a', { hasText: day });
    }

    getOtherMonthDay(): Locator {
        return this.datePicker
            .locator('.ui-datepicker-other-month')
            .first()
    }

    async getCurrentDate(): Promise<string | null> {
        return await this.dateField.inputValue()
    }

    async getTodayMonthNumber():Promise<string | null>{
        return await this.datePicker
            .locator('.ui-datepicker-today')
            .getAttribute('data-month')
    }

    async getTodayDayNumber():Promise<string | null>{
        return await this.datePicker
            .locator('.ui-datepicker-today')
            .locator('a')
            .getAttribute('data-date')
    }

    async getTodayYearNumber():Promise<string | null>{
        return await this.datePicker
            .locator('.ui-datepicker-today')
            .getAttribute('data-year')
    }

    async checkMonthHasOtherDays (): Promise<Boolean> {
        return (await this.datePicker.locator('.ui-datepicker-other-month').count()) > 0;
    }

    async getCurrentMonth(): Promise<string> {
        const currMonth = await this.datePicker
            .locator('.ui-datepicker-month')
            .textContent()
        
            return currMonth?.trim() || '';
    }

    async clickRangeTo() {
        await this.rangeTo.click();
    }

    async clickRangeFrom() {
        await this.rangeFrom.click();
    }

    async clickDateField() {
        await this.dateField.click();
    }

    async clickPreviousMonth() {
        await this.previousMonthButton.click();
    }

    async clickNextMonth() {
        await this.nextMonthButton.click();
    }

    async clickDefaultFunctionality() {
        await this.defaultFunctionality.click();
    }

    async clickWithAnimation() {
        await this.withAnimation.click();
    }

    async clickOtherMonths() {
        await this.otherMonths.click();
    }

    async clickBarButton() {
        await this.barButton.click();
    }

    async clickDisplayInline() {
        await this.displayInline.click();
    }

    async clickDropDownMenusDatePicker() {
        await this.dropDownMenusDatePicker.click();
    }

    async clickMultipleMonths() {
        await this.multipleMonths.click();
    }

    async clickWithDateFormat() {
        await this.withDateFormat.click();
    }

    async clickIconTrigger() {
        await this.iconTrigger.click();
    }

    async clickLocalizeCalendar() {
        await this.localizeCalendar.click();
    }

    async clickAlternateField() {
        await this.alternateField.click();
    }   

    async clickDateRangeStrict() {
        await this.dateRangeStrict.click();
    }

    async clickdateRangeNonStrict(){
        await this.dateRangeNonStrict.click();
    }

    async clickWeekOfYear() {
        await this.weekOfYear.click();
    }

    async selectFirstDate(day: string) {
        await this.getDayLocator(day).first().click();
    }

    async selectSecondDate(day: string) {
        await this.getDayLocator(day).nth(1).click();
    }

    async selectOtherMonthDay() {
        await this.getOtherMonthDay().click( {force: true} )
    }

    async expectDateValue(value: string) {
        await expect(this.dateField).toHaveValue(value);
    }

    async expectMonth(month: string) {
        await expect(this.datePicker).toContainText(month);
    }

    async expectDateFieldAreTheSame() {
        await expect(this.rangeTo).toHaveValue(await this.rangeFrom.inputValue())
    }

    async expectFirstDateFieldEmpty() {
        await expect(this.rangeFrom).toBeEmpty()
    }

    async fillDateField(data: string) {
        this.dateField.focus()
        this.dateField.fill(data)
    }

    async fillFirstDateField(data: string) {
        this.rangeFrom.focus()
        this.rangeFrom.fill(data)
    }

    async fillSecondDateField(data: string) {
        this.rangeTo.focus()
        this.rangeTo.fill(data)
    }

    async expectDateFieldIsEmpry(){
        await expect(this.dateField).toBeEmpty()
    }

    async expectDateFieldHasData(data: string) {
        await expect(this.dateField).toHaveValue(data)
    }

    async selectMonth(data: string){
        await this.monthDropdown.selectOption({ label: data });
    }

    async selectYear(data: string){
        await this.yearDropdown.selectOption({ label: data });
    }

}