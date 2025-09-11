const { expect } = require('@playwright/test');

class AdminUserManagementPage {
    constructor(page) {
        this.page = page;
        this.adminTab = this.page.locator("[href*='viewAdminModule']");
        this.assertadminUserManagement = this.page.locator('.oxd-text.oxd-text--h6.oxd-topbar-header-breadcrumb-level');
        this.searchInput = this.page.locator("div[class='oxd-input-group oxd-input-field-bottom-space'] div input[class='oxd-input oxd-input--active']");
        this.assertSearchInput = this.page.locator(".orangehrm-container");
        this.searchBtn = this.page.locator("button[type='submit']");
        this.statusDropdown = this.page.locator('.oxd-select-wrapper').nth(1);
        this.enabledOption = page.locator('div:has-text("Enabled")').first();
        this.dropdownMenu = this.page.locator('.oxd-select-text-input');
        this.usernameOnSearch = this.page.getByRole('textbox').nth(1);
        this.userRoleOnSearch = this.page.locator('.oxd-select-text');
        this.employeeNameOnSearch = this.page.locator('.oxd-autocomplete-text-input');
        this.statusOnSearch = this.page.locator('.oxd-input-group:has-text("Status") .oxd-select-text');
        this.submitButtonOnSearch = this.page.getByRole('button', { name: 'Search' });
        this.parentRecordsCard = this.page.locator('.oxd-table-card')
        this.recordsFoundLabel = this.page.getByText(/\(\d+\) Records Found/);
    }

    async clickAdminTab() {
        await this.adminTab.click();
    }

    async verifyAdminUserManagementPage() {
        await expect(this.assertadminUserManagement).toContainText('User Management');
    }

    async searchUser(username) {
        await this.searchInput.fill(username);
    }

    async clickSearchButton() {
        await this.searchBtn.click();
    }

    async verifySearchInput() {
        await expect(this.assertSearchInput).toContainText('Admin');
    }
    async clickStatusDropdown() {
        await this.statusDropdown.click();
    }
    async selectEnabledStatusFromDronDown() {
        await this.enabledOption.waitFor({ state: 'visible', timeout: 5000 });
        await this.enabledOption.click();
        console.log('Enabled status selected');
    }


    async selectUserRoleDropdowmItem(itemText) {
        await this.dropdownMenu.first().click();
        await this.page.getByText(`${itemText}`, { exact: true }).click();
    }


    async verifyCombinedSearchFilter(username, role, employeeName, userStatus) {
        await this.usernameOnSearch.fill(username);
        await this.userRoleOnSearch.click();
        await this.page.locator('.oxd-select-option >> text=' + role).click();
        await this.employeeNameOnSearch.fill(employeeName);
        await this.statusOnSearch.click();
        await this.page.locator('.oxd-select-option >> text=' + userStatus).click();
        await this.submitButtonOnSearch.click();
    }
    async clickResetButton() {
        await this.page.getByRole('button', { name: 'Reset' }).click();
    }

    async clickAddButton() {
        await this.page.getByRole('button', { name: 'Add' }).click();
    }

    async verifyRecordsCount() {
        await this.page.waitForSelector('.oxd-table-card');
        const recordCount = await this.parentRecordsCard.count();
        console.log('count records', recordCount);
        await expect(this.recordsFoundLabel).toBeVisible();
        await expect(this.recordsFoundLabel).toHaveText(`(${recordCount}) Records Found`)
    }

    async verifyTableHeader(expectedHeaders) {
        for (const headerText of expectedHeaders) {
            await expect(this.page.locator('.oxd-label', { hasText: headerText }), `Missing header: "${headerText}"`).toBeVisible();
        }
    }

    async verifyRecordsFoundCount() {
        // Locate the element that shows "Records Found"
        const recordText = await this.page.locator('.oxd-text--span').first().textContent();

        // Extract the number from text e.g. "Records Found: 2"
        const match = recordText.match(/\d+/);
        const actualCount = match ? parseInt(match[0], 10) : 0;

        // Count rows in the results table
        const rowCount = await this.page.locator('div.oxd-table-body div.oxd-table-card').count();

        // Assertion: records found text = number of rows
        await expect(actualCount).toBe(rowCount);
    }

}
module.exports = { AdminUserManagementPage };