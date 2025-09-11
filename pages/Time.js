const { expect } = require('@playwright/test');

class TimePage {
    constructor(page) {
        this.page = page;
        this.timeTab = this.page.locator("[href*='viewTimeModule']");
        this.assertTimePage = this.page.locator(".oxd-text.oxd-text--h6.oxd-topbar-header-breadcrumb-level")
        this.editButton = this.page.getByRole('button', { name: 'Edit' });
        this.projectField = this.page.getByRole('textbox', { name: 'Type for hints...' });
        this.activityDropDown = this.page.getByRole('cell', { name: '-- Select -- ' }).locator('i');
        this.calendarIcon = page.locator('form i').first();
        this.dateCell = (day) => page.getByText(day, { exact: true }); // dynamic date
        this.timeTextbox = page.getByRole('textbox', { name: 'hh:mm' });
        this.amPmRadio = (period) => page.locator(`input[name="pm"][value="${period}"]`); // if AM/PM is radio/checkbox
        this.noteField = page.getByRole('textbox', { name: 'Type here' });
        this.inButton = page.getByRole('button', { name: 'In' });
        this.outButton = page.getByRole('button', { name: 'Out' });
        this.successMsg = page.getByText('SuccessSuccessfully Saved');
        this.errormsg = this.page.locator('span.oxd-input-field-error-message.oxd-input-group__message');
        this.employeeName = this.page.getByRole('textbox', { name: 'Type for hints...' });
        this.viewReportButton = this.page.getByRole('listitem').filter({ hasText: 'Reports' });
        this.assertAddPage = page.locator(".oxd-text.oxd-text--h5.oxd-table-filter-title");
        this.viewButton = page.locator('form').getByRole('button', { name: 'View' });
        this.edit = this.page.locator("button.oxd-icon-button.oxd-table-cell-action-space >> i.bi-pencil-fill").first();
        this.editName = this.page.locator("input.oxd-input.oxd-input--active", "Your text").first()
        this.deleteRecord = this.page.locator('button:has(i.bi-trash)').first();
        this.deleteError = this.page.locator('#oxd-toaster_1')
        this.sort = this.page.getByRole('columnheader', { name: 'Customer Name ' }).locator('i').first();
        this.ascOrder = this.page.getByRole('menu').getByText('Ascending');
        this.descOrder = this.page.getByRole('menu').getByText('Descending');
        this.projectAsc = this.page.getByRole('columnheader', { name: 'Project ' }).locator('i').first();
        this.deleteIcon = page.locator('i.oxd-icon.bi-trash');
        this.confirmDeleteButton = page.locator('button:has-text("Yes, Delete")');
        this.projectName = this.page.getByRole('textbox', { name: 'Type for hints...' });
        this.addEmployeeName = this.page.getByRole('textbox', { name: 'Type for hints...' });
        this.viewButton = this.page.getByRole('button', { name: 'View' });
        this.customerName = this.page.locator('.oxd-input.oxd-input--active').nth(0);
        this.alreadyExistsError = this.page.locator('.oxd-input-field-error-message');
        this.projectAdmin = this.page.getByRole('textbox', { name: 'Type for hints...' }).nth(2);
        this.addExistingCustomerName = this.page.getByRole('textbox').nth(1);
        this.employeeNameToGenerateReport = this.page.getByRole('textbox', { name: 'Type for hints...' }).first();

    }

    async enterProjectName(name) {
        await this.projectName.fill(name);
    }

    async enterEmployeeNameToViewReport(name) {
        await this.employeeName.fill(name);
    }

    async enterEmployeeNameToGenerateReport(name) {
        await this.employeeNameToGenerateReport.fill(name);
        await this.page.getByText(name).click();
    }

    async clickOnViewReportsForAttendanceTotalSummaryReport() {
        await this.viewReportButton.click();
        this.customerName = page.locator('.oxd-input oxd-input--active')
    }

    async clickTimeTab() {
        await this.timeTab.click();
    }
    async verifyTimePage() {
        await expect(this.assertTimePage).toHaveText('Timesheets');
    }

    async searchEmployee(name) {
        await this.page.getByRole('textbox', { name: 'Type for hints...' }).fill(name)
    }

    async clickViewButton() {
        await this.page.locator('form').getByRole('button', { name: 'View' }).click();
    }

    async clickOnViewReports() {
        await this.page.getByRole('row', { name: 'manda akhil user 2023-16-01' }).getByRole('button').click();
    }

    async myTimesheetNavigation() {
        await this.page.getByRole('listitem').filter({ hasText: 'Timesheets' }).click();
        await this.page.getByRole('listitem').filter({ hasText: /^My Timesheets$/ }).click();
    }

    async clickEditButton() {
        await this.editButton.click();
    }

    async projectInputField(name) {
        await this.projectField.fill(name)
        await this.page.getByText('Internal - General HR Tasks').click();
    }

    async clickActivityDropDown() {
        await this.activityDropDown.click();
    }

    async selectOption(optionName) {
        await this.page.getByRole('option', { name: optionName }).click();
    }

    async selectDate(day) {
        if (!day) {
            // Random day from 1 to 28 to avoid month-end issues
            day = Math.floor(Math.random() * 28) + 1;
        }
        await this.calendarIcon.click();
        await this.dateCell(day.toString()).click();
    }

    async setTime(time) {
        await this.timeTextbox.click();
        await this.timeTextbox.fill(time);
    }

    async addNote(note) {
        await this.noteField.click();
        await this.noteField.fill(note);
    }

    async punchIn(note) {
        const randomTime = getRandomTime(8, 11); // Morning hours for punch in
        await this.addNote(note);
        await this.setTime(randomTime);
        await this.inButton.click();
        await expect(this.successMsg).toBeVisible();
    }

    async punchOut(note) {
        const randomTime = getRandomTime(10, 20); // Afternoon/evening for punch out
        await this.addNote(note);
        await this.setTime(randomTime);
        await this.outButton.click();
        //await expect(this.successMsg).toBeVisible();
    }

    async verifyErrorMessage(expectedMessage) {
        await expect(this.errormsg).toHaveText(expectedMessage);
    }

    async assertEmployeeReportPage() {
        await expect(this.page).toHaveURL(/.*displayEmployeeReportCriteria/);
    }

    async addEmployeeName(name) {
        await this.employeeName.fill(name);
        await this.page.getByText(name).click();
    }

    async verifyStatus() {
        const status = await this.page.getByText('Status: Not Submitted').textContent();
        console.log('Current Status:', status);
    }

    async verifyPageTitle(value) {
        await expect(this.assertAddPage).toHaveText(value);
    }

    async enterEmployeeName(name) {
        await this.projectField.fill(name)
        await this.page.getByText('Rahul Das').first().click();
    }

    async clickViewButton() {
        await this.viewButton.click();
    }

    async verifyRecordsCount() {
        const locator = this.page.getByText(/\(\d+\) Records Found|No Records Found/);
        const recordsText = await locator.textContent();

        if (recordsText.includes('No Records Found')) {
            console.log('No Records Found');
        } else {
            const recordCount = recordsText.match(/\d+/)[0];
            console.log('Records Found:', recordCount);
        }
    }

    async editButtonFunctionality() {
        await this.edit.click();
    }
    async editNameFunctionality(name) {
        await this.editName.fill(name);

    }

    async deleteRecordFunctionality() {
        await this.deleteRecord.click();
        await expect(this.deleteError).toBeVisible();
    }

    async selectCustomerAsendingOrder() {
        await this.sort.click();
        await this.ascOrder.click();
    }

    async selectProjectAsendingOrder() {
        await this.projectAsc.click();
        await this.ascOrder.click();
    }
    async enterCustomerName(name) {
        await this.customerName.fill(name);
    }

    async verifyAlreadyExistsError() {
        await expect(this.alreadyExistsError).toHaveText('Already exists');
        await expect(this.alreadyExistsError).toBeVisible();
    }

    async clickDeleteIcon(index) {
        await this.deleteIcon.nth(index).click();
        await this.confirmDeleteButton.click();
    }

    async selectDropDownItem(itemText) {
        await this.page.click(`ul.oxd-dropdown-menu >> text="${itemText}"`);
    }

    async clickTopMenu(menuItemText) {
        await this.page
            .locator(`nav[role='navigation'] li:has-text("${menuItemText}")`)
            .click();
    }

    async sortEmployeeById(order) {
        await this.page.getByRole('menu').getByText(order).click();
    }
    async clickNameDropDown() {
        const nameColumn = this.page.getByRole('columnheader', { name: 'Name ' }).locator('div').first();
        await nameColumn.waitFor({ state: 'visible' });
        await nameColumn.click();
    }

    async clickAddButton() {
        await this.page.getByRole('button', { name: ' Add' }).click();

    }

    async addProjectinProjects(name, customer_name, description, project_name) {
        await this.page.getByRole('textbox').nth(1).fill(name);
        await this.page.locator('form div').filter({ hasText: 'NameCustomer Name Add Customer' }).getByPlaceholder('Type for hints...').fill(customer_name);
        await this.page.getByRole('textbox', { name: 'Type description here' }).fill(description);
        await this.page.getByRole('textbox', { name: 'Type for hints...' }).nth(1).fill(project_name);
        await this.page.getByRole('button', { name: 'Save' }).click();
    }

    async clickOnToggle() {
        await this.page.locator('div').filter({ hasText: /^Employee can change current time when punching in\/out$/ }).locator('span').click();
    }

    async searchProject(partialName) {
        await this.page.getByRole('textbox', { name: 'Type for hints...' }).nth(1).fill(partialName);
    }

    async searchButon() {
        await this.page.getByRole('button', { name: 'Search' }).click();
    }

    async searchByNameProject(CustomerName) {
        await this.page.getByRole('textbox', { name: 'Type for hints...' }).first().fill(CustomerName);
    }

    async searchByProjectAdmin(name) {
        await this.projectAdmin.fill(name);
        await this.page.getByRole('option').first().click();
    }

    async noRecordsFoundErrorOption() {
        await expect(this.page.getByRole('option', { name: 'No Records Found' })).toBeVisible({ timeout: 5000 });
    }   

    async enteringEmployeeName(name) {
        await this.page.getByRole('textbox', { name: 'Type for hints...' }).fill(name);
        await this.page.getByRole('option', { name: name }).locator('span').click();
        // await this.page.getByRole('row', { name: `${name} 0.00 View` }).getByRole('button').click();
    }

    async addExistingCustomer(){
        await this.addExistingCustomerName.fill('ACME Ltd');
    }

    async clickOnViewReportsForAttendanceTotalSummaryReport1() {
        await this.viewReportButton.click();
        this.customerName = this.page.locator('.oxd-input oxd-input--active')
    }

    async verifyInfoRecordsCount() {
        await this.page.getByText('InfoNo Records Found').isVisible();
    }

}

function getRandomTime(startHour = 8, endHour = 18) {
    let hour = Math.floor(Math.random() * (endHour - startHour + 1)) + startHour;
    let minute = Math.floor(Math.random() * 60);

    const ampm = hour >= 12 ? 'PM' : 'AM';
    hour = hour % 12 || 12;
    const minuteStr = minute.toString().padStart(2, '0');

    return `${hour}:${minuteStr} ${ampm}`;
}

module.exports = { TimePage }