const { expect } = require('@playwright/test');

class LeavePage {
    constructor(page) {
        this.page = page;
        this.leaveTab = this.page.locator("[href*='viewLeaveModule']");
        this.assertleavePage = this.page.locator(".oxd-text.oxd-text--h6.oxd-topbar-header-breadcrumb-module");
        this.leaveTypeDropdown = page.locator('.oxd-select-wrapper > .oxd-select-text > .oxd-select-text--after > .oxd-icon').first();
        this.personalLeaveOption = page.getByRole('option', { name: 'CAN - Personal' });
        this.personalLeaveOption1 = page.getByRole('option', { name: 'US - Personal' });
        this.employeeNameInput = page.getByRole('textbox', { name: 'Type for hints...' });
        this.subunitDropdown = page.locator('div:nth-child(2) > .oxd-input-group > div:nth-child(2) > .oxd-select-wrapper > .oxd-select-text > .oxd-select-text--after > .oxd-icon');
        this.administrationOption = page.getByText('Administration');
        this.invalidMessage = page.getByText('Invalid');
        this.searchButton = page.getByRole('button', { name: 'Search' });
        this.leaveStatusDropdown = this.page.locator('.oxd-icon.bi-caret-down-fill.oxd-select-text--arrow').first();
        this.scheduledStatusOption = page.getByText('Scheduled');
        this.fromDateCalendarIcon = page.locator('div:nth-child(2) > .oxd-input-group > div:nth-child(2) .oxd-icon.bi-calendar');
        this.toDateCalendarIcon = page.locator('[placeholder="To Date"] ~ .oxd-icon.bi-calendar');
        this.datePickerDay = (day) => page.getByText(day, { exact: true });
        this.monthDropdown = page.locator('.oxd-calendar-selector-month');
        this.yearDropdown = page.locator('.oxd-calendar-selector-year');
        this.applyButton = page.getByRole('button', { name: 'Apply' });
        this.validationMessage = this.page.locator('.oxd-text.oxd-text--span.oxd-input-field-error-message.oxd-input-group__message');
        this.fromDate = this.page.getByRole('textbox', { name: 'yyyy-dd-mm' }).first();
        this.toDate = this.page.getByRole('textbox', { name: 'yyyy-dd-mm' }).nth(1);
        this.leaveTypeName = this.page.locator('form').getByRole('textbox');
        this.leaveTypeName = this.page.locator('input.oxd-input--active').nth(1);
        this.asssignBtn = this.page.getByRole('button', { name: 'Assign' });
        this.leaveTypeDropDown = this.page.locator('.oxd-select-wrapper > .oxd-select-text > .oxd-select-text--after > .oxd-icon').first();
        this.leavePeriod= this.page.locator('form i').nth(1);
    }

    async clickleaveTab() {
        await this.leaveTab.click();
    }

    async verifyleavePage() {
        await expect(this.assertleavePage).toHaveText('Leave');
    }

    async clickAssignButton() {
        await this.asssignBtn.click();
    }

    async selectLeaveStatusScheduled() {
        await this.leaveStatusDropdown.click();
        await this.scheduledStatusOption.click();
    }

    async selectLeaveTypePersonal() {
        await this.leaveTypeDropdown.click();
        await this.personalLeaveOption.click();
    }

    async selectLeaveTypePersonal1() {
        await this.leaveTypeDropdown.click();
        await this.personalLeaveOption1.click();
    }

    async searchEmployee(name) {
        await this.employeeNameInput.dblclick();
        await this.employeeNameInput.fill(name);
    }

    async selectSubunitAdministration() {
        await this.subunitDropdown.click();
        await this.administrationOption.click();
    }

    async clickInvalidMessage() {
        await this.invalidMessage.click();
    }

    async clickSearchButton() {
        await this.searchButton.click();
    }

    async selectDate(fieldIndex, dateString) {
        const [year, month, day] = dateString.split('-');
        await this.page.locator('form i').nth(fieldIndex).click();
        await this.page.locator('.oxd-date-input-calendar .oxd-calendar-selector-year').click();
        await this.page.getByText(year, { exact: true }).click();
        await this.page.locator('.oxd-date-input-calendar .oxd-calendar-selector-month').click();
        const monthNames = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        await this.page.getByText(monthNames[parseInt(month) - 1], { exact: true }).click();
        await this.page.getByText(day.replace(/^0/, ''), { exact: true }).click();
    }

    async verifyDateValidationError(expectedMsg) {
        await expect(this.validationMessage).toBeVisible();
        await expect(this.validationMessage).toHaveText(expectedMsg);
    }

    async clickLeaveStatusDropdown() {
        await this.leaveStatusDropdown.click();
    }

    async clickLeaveStatus(value) {
        await this.page.getByRole('option', { name: value }).click();
    }

    // async clickLeaveTypeDropDown() {
    //     await this.page.locator("(//i)[18]").click();
    // }

    async clickLeaveTypeDropDown() {
        await this.leaveTypeDropDown.click();
        //await this.page.getByRole('option', { name: 'CAN - Bereavement' }).click();
    }

    async enterFromDate(date) {
        await this.fromDate.fill(date);
    }

    async enterToDate(date) {
        await this.toDate.fill(date);
    }

    async entitlementPageNavigation() {
        await this.page.getByText('Entitlements').click();
        await this.page.getByRole('menuitem', { name: 'Add Entitlements' }).click();
    }

    async positiveEntitlement(leave) {
        await this.page.getByRole('textbox').nth(2).fill(leave);
    }

    async negativeEntitlement(leave) {
        await this.page.getByRole('textbox').nth(2).fill(leave);
        await expect(this.page.getByText('Should be a number with upto')).toBeVisible();
    }

    // Holiday-related methods
    async addHolidayButton() {
        await this.page.getByRole('button', { name: ' Add' }).click();
    }

    async enterNameHoliday(name) {
        await this.page.getByRole('textbox').nth(1).fill(name);
    }

    async selectHolidayDate(date) {
        await this.page.getByRole('textbox', { name: 'yyyy-dd-mm' }).fill(date);
    }

    async clickSaveButton() {
        await this.page.getByRole('button', { name: 'Save' }).click();
    }

    // Additional methods from TC_LV_051 branch
    async searchEmployeeName(emp_name) {
        await this.page.getByRole('textbox', { name: 'Type for hints...' }).fill(emp_name);
    }

    async leaveDate(date) {
        await this.page.locator('form i').nth(1).click();
        await this.page.getByText(date).click();
    }

    async daysCount() {
        const totalDays = this.page.getByText(/Total \d+(\.\d{1,2})? Day\(s\)/);
        await expect(totalDays).toBeVisible();
    }

    async addEntittlement(name) {
        await this.page.getByRole('textbox', { name: 'Type for hints...' }).fill(name);
        await this.page.getByRole('option', { name: name }).click();
    }

    async dropDownLeaveType(leave_type) {
        await this.page.getByText('-- Select --').click();
        await this.page.getByRole('option', { name: leave_type }).click();
    }

    async savingButton() {
        await this.page.getByRole('button', { name: 'Save' }).click();
    }

    async searchingEntitlement() {
        await this.page.getByRole('button', { name: 'Search' }).click();
    }

    async clickGenerate() {
        await this.page.getByRole('button', { name: 'Generate' }).click();
    }

    async employeeUA() {
        await this.page.locator('label').filter({ hasText: 'Employee' }).click();
    }

    async searchByEmployee(name) {
        await this.page.getByRole('textbox', { name: 'Type for hints...' }).fill(name);
    }

    async selectLeavePeriod() {
        //await this.leavePeriod.click();
        await this.page.getByText('-01-01 - 2021-31-12').click();
    }

    async employee_name(name) {
        await this.page.getByRole('textbox', { name: 'Type for hints...' }).fill(name);
    }

    async leaveType(leave_type) {
        await this.page.getByText('-- Select --').click();
        await this.page.getByText(leave_type).click();
    }

    async dateSelector(date, date_to) {
        await this.page.getByRole('textbox', { name: date }).first();
        await this.page.getByRole('textbox', { name: date_to }).nth(1);
    }

    async assignButton() {
        await this.page.getByRole('button', { name: 'Assign' }).click();
    }

    async balance_insufficent() {
        await expect(this.page.getByText('Balance not sufficient')).toBeVisible();
    }

    async editLeave(edit) {
        await this.page.getByRole('row', { name: ' CAN - Bereavement  ' }).getByRole('button').nth(1).click();
        await this.page.locator('form').getByRole('textbox').fill(edit);
    }

    async configureWork(day) {
        await this.page.locator('.oxd-select-text').first().click();
        await this.page.getByText(day).first();
    }

    async addHoliday(days, days_of) {
        await this.page.getByRole('textbox').nth(1).fill(days);
        await this.page.getByRole('textbox', { name: days_of }).fill(days_of);
    }

    async fillLeaveTypeDetails(name) {
        const leaveTypeName = name + Date.now(); 
        await this.leaveTypeName.fill(leaveTypeName);
    }

    async errorOnLeavedate() {
        await this.page.getByText('To date should be after from').isVisible();
    }
}

module.exports = { LeavePage };
