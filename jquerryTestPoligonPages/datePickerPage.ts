import { Locator, Page, FrameLocator } from '@playwright/test';

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

    }

    getDayLocator(day: string): Locator {
        return this.datePicker.locator('a', { hasText: day });
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

}