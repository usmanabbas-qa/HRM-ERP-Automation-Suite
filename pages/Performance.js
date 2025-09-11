const { expect } = require('@playwright/test');
const { title } = require('process');

class PerformancePage {
    constructor(page) {
        this.page = page;
        this.performanceTab = this.page.locator("[href*='viewPerformanceModule']");
        this.assertPerformancePage = this.page.locator(".oxd-text.oxd-text--h6.oxd-topbar-header-breadcrumb-module")
        this.noRecordsFountd = this.page.locator('span:has-text("No Records Found")')
        this.addButton = this.page.getByRole('button', { name: ' Add' });
        this.leftNanigation = this.page.getByLabel('Sidepanel').locator('div').filter({ hasText: 'AdminPIMLeaveTimeRecruitmentMy' });
        this.tabConfigure = this.page.getByRole('listitem').filter({ hasText: 'Configure' });
        this.tabManageReviews = this.page.getByRole('listitem').filter({ hasText: 'Manage Reviews' });
        this.tabMyTrackers = this.page.getByRole('listitem').filter({ hasText: 'My Trackers' });
        this.tabEmployeeTrackers = this.page.getByRole('listitem').filter({ hasText: 'Employee Trackers' });
        this.viewButton = this.page.getByRole('button', { name: 'View' });
        this.dateErrorMsg = this.page.locator('.oxd-text.oxd-text--span.oxd-input-field-error-message.oxd-input-group__message')
        this.resetButton = this.page.locator('.oxd-button.oxd-button--medium.oxd-button--ghost')
        this.employeeName = this.page.getByPlaceholder('Type for hints...');
        this.saveButton = page.getByRole('button', { name: 'Save' });
        this.reviewerField = this.page.locator('input[placeholder="Type for hints..."]').nth(1);
    }

    async clickperformanceTab() {
        await this.performanceTab.click();
    }

    async verifyPerformancePage() {
        await expect(this.assertPerformancePage).toHaveText('Performance');
    }

    async selectDropDownItem(itemText) {
        await this.page.click(`ul.oxd-dropdown-menu >> text="${itemText}"`);
    }

    async clickTopMenu(menuItemText) {
        await this.page
            .locator(`nav[role='navigation'] li:has-text("${menuItemText}")`)
            .click();
    }

    async verifyPageHeader(title) {
        await this.page.getByRole('heading', { name: title });
    }

    async verifyContentTabs() {
        await expect(this.page.getByText('Manage Reviews')).toBeVisible();
        await expect(this.page.getByRole('link', { name: 'My Trackers' })).toBeVisible();
        await expect(this.page.getByRole('link', { name: 'Employee Trackers' })).toBeVisible();
        await expect(this.page.getByRole('button', { name: ' Add' })).toBeVisible();
    }

    async clickSearchButton() {
        await this.page.getByRole('button', { name: 'Search' }).click();
    }


    async clickJobDropDown(job_title) {
        await this.page.locator('div').filter({ hasText: /^-- Select --$/ }).nth(2).click();
        await this.page.getByRole('option', { name: job_title }).click();
    }


    async clickResetButton() {
        await this.page.getByRole('button', { name: 'Reset' }).click();
    }

    async verifyNoRecordsFound() {
        await expect(this.noRecordsFountd).toBeVisible();
    }

    async clickAddButton() {
        await this.addButton.click();
    }

    async assertKPIPage() {
        await expect(this.page).toHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/performance/saveKpi');
    }

    async assertJobTitle() {
        const jobTitleITmanager = this.page.getByText('IT Manager').first();
        await expect(jobTitleITmanager).toBeVisible();
    }

    async verifyLeftNavigationMenu() {
        await expect(this.leftNanigation).toBeVisible();
    }

    async verifyContentTabs() {
        await expect(this.tabConfigure).toBeVisible();
        await expect(this.tabManageReviews).toBeVisible();
        await expect(this.tabMyTrackers).toBeVisible();
        await expect(this.tabEmployeeTrackers).toBeVisible();
    }

    async verifyAddButton() {
        const isVisible = await this.addButton.isVisible().catch(() => false);

        if (!isVisible) {
            console.log('Add button not found on the Performance page');
        } else {
            console.log('Add button is visible');
        }
    }

    async verifyViewButton() {
        await expect(this.viewButton).toBeVisible();
    }

    async verifyManageReviewDropDownItems() {
        await expect(this.page.getByRole('menuitem', { name: 'My Reviews' })).toBeVisible();
        await expect(this.page.getByRole('menuitem', { name: 'Manage Reviews' })).toBeVisible();
        await expect(this.page.getByRole('menuitem', { name: 'Employee Reviews' })).toBeVisible();
    }

    async selectCalender(elementIndex) {
        const calendarIcon = this.page.locator('.oxd-icon.bi-calendar').nth(elementIndex);
        await calendarIcon.click();
    }

    async selectDate(selectedDate) {
        const date = await this.page.getByText(`${selectedDate}`, { exact: true }).click();
    }

    async verifyDateErrorMessage() {
        await expect(this.dateErrorMsg).toBeVisible();
    }

    async clickOnResetButton() {
        await this.resetButton.click();
    }

    async enterEmployeeName(name) {
        await this.employeeName.fill(name);
    }

    async visiblityOfContent() {
        await expect(this.page.getByRole('button', { name: 'Upgrade' })).toBeVisible;
        await expect(this.page.getByRole('heading', { name: 'Employee Performance Trackers' })).toBeVisible;
        await expect(this.page.getByRole('link', { name: 'client brand banner' })).toBeVisible;
        await expect(this.page.getByRole('button', { name: '' })).toBeVisible;
    }

    async visiblityOfLeftNavigation() {
        await expect(this.page.getByRole('link', { name: 'Admin' })).toBeVisible;
        await expect(this.page.getByRole('link', { name: 'PIM' })).toBeVisible;
        await expect(this.page.getByRole('link', { name: 'Leave' })).toBeVisible;
        await expect(this.page.getByRole('link', { name: 'Time' })).toBeVisible;
        await expect(this.page.getByRole('link', { name: 'Recruitment' })).toBeVisible;
        await expect(this.page.getByRole('link', { name: 'My Info' })).toBeVisible;
        await expect(this.page.getByRole('link', { name: 'Performance' })).toBeVisible;
        await expect(this.page.getByRole('link', { name: 'Dashboard' })).toBeVisible;
        await expect(this.page.getByRole('link', { name: 'Directory' })).toBeVisible;
        await expect(this.page.getByRole('link', { name: 'Maintenance' })).toBeVisible;
        await expect(this.page.getByRole('link', { name: 'Claim' })).toBeVisible;
        await expect(this.page.getByRole('link', { name: 'Buzz' })).toBeVisible;
    }

    async clickSaveButton(index) {
        await this.saveButton.nth(index).click();
    }
  
    async searchonEmployeeTracker(op_text) {
        await this.page.locator('div').filter({ hasText: /^Current Employees Only$/ }).nth(2).click();
        await this.page.getByText(op_text).click();
    }

    async actionColumnVisiblity() {
        await expect(this.page.getByRole('button', { name: 'View' })).toBeVisible();
    }

    async enterReviewerField(reviewerName) {
        await this.reviewerField.fill(reviewerName);
    }
}

module.exports = { PerformancePage }