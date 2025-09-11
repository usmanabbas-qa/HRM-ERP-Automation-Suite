const { expect } = require('@playwright/test');


class PIMEmployeeListPage {
    constructor(page) {
        this.page = page;
        this.assertPIM = page.locator('.oxd-text.oxd-text--h6.oxd-topbar-header-breadcrumb-module');
        this.pimTab = this.page.locator("[href*='viewPimModule']");
        this.employeeIDField = this.page.locator("(//input[@class='oxd-input oxd-input--active'])[2]");
        this.Search = this.page.getByText('Search', { exact: true });
        this.EmployeeName = this.page.getByPlaceholder('Type for hints...').first();
        this.EmployeeId = this.page.locator('.oxd-input.oxd-input--active').nth(1);
        this.EmployeeStatus = this.page.locator('div.oxd-select-text-input', { hasText: '-- Select --' }).first();
        this.jobTitlle = this.page.locator('div.oxd-select-text-input', { hasText: '-- Select --' }).nth(1);
        this.subUnit = this.page.locator('div.oxd-select-text-input', { hasText: '-- Select --' }).nth(2);
        this.employeeIDField = this.page.locator("(//input[@class='oxd-input oxd-input--active'])[2]");
        this.Search = this.page.getByText('Search', { exact: true });
        this.deleteIcon = page.locator('i.oxd-icon.bi-trash');
        this.confirmDeleteButton = page.locator('button:has-text("Yes, Delete")');
        this.paginationButton = page.locator('.oxd-pagination-page-item.oxd-pagination-page-item--page');
        this.nextButton = this.page.locator('button.oxd-pagination-page-item--previous-next');
        this.resetBtn = this.page.getByRole('button', { name: 'Reset' })
    }

    async clickPIMTab() {
        await this.pimTab.click();
    }
    async verifyPIM() {
        await expect(this.assertPIM).toHaveText('PIM');
    }

    async searchEmployeeByPartialName(partialName) {
        const input = this.page.locator('input[placeholder="Type for hints..."]').first();
        await input.fill(partialName);
        const suggestion = this.page.locator('.oxd-autocomplete-option');
        await suggestion.first().waitFor({ state: 'visible' });
        await suggestion.first().click();
        const searchbtn = this.page.getByText(' Search ', { exact: true });
        await searchbtn.click();
    }

    async EmployeeNemVisibility() {
        await expect(this.EmployeeName).toBeVisible();
    }

    async EmployeeIdVisibility() {
        await expect(this.EmployeeId).toBeVisible();
    }

    async EmployeeStatusVisibility() {
        await expect(this.EmployeeStatus).toBeVisible();
    }

    async jobTitleVisibility() {
        await expect(this.jobTitlle).toBeVisible();
    }

    async subUnitVisibility() {
        await expect(this.subUnit).toBeVisible();
    }

    async searchEmployeeByPartialName(partialName) {
        const input = this.page.locator('input[placeholder="Type for hints..."]').first();
        await input.fill(partialName);
        const suggestion = this.page.locator('.oxd-autocomplete-option');
        await suggestion.first().waitFor({ state: 'visible' });
        await suggestion.first().click();
        const searchbtn = this.page.getByText(' Search ', { exact: true });
        await searchbtn.click();
    }

    async selectDropdown(indexDropdown) {
        const dropdown = this.page.locator('form i').nth(indexDropdown)
        await dropdown.click();
    }

    async selectDropdownOption(dropdownOption) {
        const option = this.page.getByText(dropdownOption);
        await expect(option).toBeVisible();
        await option.click();
    }

    async enterEmployeeId(value) {
        await this.employeeIDField.fill(value)
    }

    async enterEmployeeName(name) {
        await this.EmployeeName.fill(name);
    }

    async selectDropdown(indexDropdown) {
        const dropdown = this.page.locator('form i').nth(indexDropdown)
        await dropdown.click();
    }

    async selectDropdownOption(dropdownOption) {
        const option = this.page.getByText(dropdownOption);
        await expect(option).toBeVisible();
        await option.click();
    }

    async enterEmployeeId(value) {
        await this.employeeIDField.fill(value)
    }

    async clickSearchButton() {
        await this.Search.click();
    }

    async clickDeleteIcon(index) {
        await this.deleteIcon.nth(index).click();
        await this.confirmDeleteButton.click();
    }

    async clickIDdropdown(){
        await this.page.getByRole('columnheader', { name: 'Id ' }).locator('i').first().click();
    }
    async sortEmployeeById(order) {
        await this.page.getByRole('menu').getByText(order).click();
    }
    async clickLastNameDropDown(){
        await this.page.getByRole('columnheader', { name: 'Last Name ' }).locator('i').first().click();
    }

    async clickIncludeDropDown(){
        await this.page.locator('div').filter({ hasText: /^Current Employees Only$/ }).nth(2).click();
    }

    async clickOnOptionInInclude(option){
        await this.page.getByText(option).click();
    }

    async clickResetButton() {
        await this.resetBtn.click();
    }
      
    async selectCheckbox(index){
        const checkbox = this.page.locator('.oxd-icon.bi-check.oxd-checkbox-input-icon').nth(index);
        await checkbox.click();
    }

    async paginationToAllPages(){
        await expect(this.paginationButton.nth(0)).toBeVisible();
        const paginationCount = await this.paginationButton.count();
        console.log(`Total pagination count: ${paginationCount}`);
        for (let i = 0; i<= paginationCount; i++){
            if ( i> 0 ){
                await this.nextButton.nth(1).click();
            }
            await this.nextButton.click();  
        }
    }

    async selectDropdownOptionForJob(dropdownOption) {
        const option = this.page.getByRole('option', { name: dropdownOption });
        await expect(option).toBeVisible();
        await option.click();
    }

}

module.exports = { PIMEmployeeListPage };