const { expect } = require('@playwright/test');

class ClaimPage {
    constructor(page) {
        this.page = page;
        this.claimTab = this.page.locator("[href*='viewClaim']");
        this.assertClaimPage = this.page.locator(".oxd-text.oxd-text--h6.oxd-topbar-header-breadcrumb-module");
        this.claimTab = page.getByRole('link', { name: 'Claim' });
        this.assignClaimButton = page.getByRole('button', { name: ' Assign Claim' });
        this.typeHintsInput = page.getByRole('textbox', { name: 'Type for hints...' });
        this.dropdownIcon = page.locator('form i');
        this.medicalReimbursementOption = page.getByText('Medical Reimbursement');
        this.currencyOption = page.getByText('Pakistan Rupee');
        this.commentTextarea = page.locator('textarea');
        this.invalidMessage = page.getByText('Invalid');
        this.createButton = page.getByRole('button', { name: 'Create' });
        this.recordsContainer = this.page.locator('.orangehrm-container');
        this.status = page.locator('.oxd-switch-input.oxd-switch-input--active.--label-right');
        this.inputEvent = page.getByRole('textbox').nth(1);
        this.expense = this.page.getByRole('textbox').nth(1);
        this.dropdownIcons = this.page.locator('form i');
        this.cancelButton = this.page.getByRole('button', { name: 'Cancel' });
        this.employeeNameField = this.page.getByRole('textbox', { name: 'Type for hints...' }).first();
        this.addButton = this.page.getByRole('button', { name: ' Add' });
        this.saveButton = this.page.getByRole('button', { name: 'Save' });
        this.assertPageTitle = page.locator(".oxd-text.oxd-text--h5.oxd-table-filter-title");
    }

    async clickClaimTab() {
        await this.claimTab.click();
    }

    async verifyClaimPage() {
        await expect(this.assertClaimPage).toHaveText('Claim');
    }

    async addEvent(eventName) {
        await this.inputEvent.fill(eventName);
    }

    async clickStatus() {
        await this.status.click();
    }

    async clickAssignClaim() {
        await this.assignClaimButton.click();
    }

    async searchAndSelectHint(text) {
        await this.typeHintsInput.dblclick();
        await this.typeHintsInput.fill(text);
        await this.dropdownIcon.first().click();
    }

    async searchByName(text) {
        await this.typeHintsInput.dblclick();
        await this.typeHintsInput.fill(text);
    }

    async selectMedicalReimbursement() {
        await this.medicalReimbursementOption.click();
    }

    async selectCurrency() {
        await this.dropdownIcon.nth(1).click();
        await this.currencyOption.click();
    }

    async addComment(comment) {
        await this.commentTextarea.dblclick();
        await this.commentTextarea.fill(comment);
    }

    async clickCreateButton() {
        await this.createButton.click();
    }

    async verifyInvalidMessageVisible() {
        await expect(this.invalidMessage).toBeVisible();
    }

    async eventErrorMessage() {
        await expect(this.page.getByText('Required').first()).toBeVisible();
    }

    async CurrencyErrorMessage() {
        await expect(this.page.getByText('Required').nth(1)).toBeVisible();
    }

    async clickEventNameDropDown() {
        await this.page.locator('form i').first().click();
    }

    async selectDropDownOption(value) {
        await this.page.getByRole('option', { name: value }).click();
    }

    async verifySelectedEvent(value) {
        const cellText = await this.page.getByRole('cell', { name: value }).locator('span').textContent();
        console.log(cellText);
    }

    async clickStatusDropDown() {
        await this.page.locator('form i').nth(1).click();
    }

    async verifyRecordContainer() {
        await expect(this.recordsContainer).toBeVisible();
    }

    async clickBack() {
        await this.backButton.click();
    }

    async openConfiguration() {
        await this.configMenu.click();
        await this.expenseTypesMenu.click();
    }

    async clickAddExpense() {
        await this.addButton.click();
    }

    async fillExpenseName(name) {
        await this.expense.fill(name);
    }

    async clickSave() {
        await this.saveButton.click();
    }

    async verifyInvalidMessage() {
        await expect(this.invalidMessage).toBeVisible();
    }

    async verifyRequiredMessage() {
        await expect(this.requiredMessage).toBeVisible();
    }

    async searchAndSelectEmployee(name) {
        await this.typeHintsInput.fill(name);
        await this.page.getByRole('option', { name }).first().click();
    }

    async selectEvent(eventName) {
        await this.dropdownIcons.first().click();
        await this.page.getByRole('option', { name: eventName }).click();
    }

    async enterEmployeeName(name) {
        await this.employeeNameField.fill(name);
    }

    async verifyIncludeOption(text) {
        await this.page.getByText(text).isVisible();
    }

    async selectStatusOption(text) {
        await this.page.getByRole('option', { name: text }).click();
    }

    async clickViewDetailButton() {
        await this.page.getByRole('cell', { name: 'View Details' }).first().click();
    }

    async claimPageRequiredFields() {
        await this.page.getByText('Required').first().isVisible();
        await this.page.getByText('Required').nth(1).isVisible();
        await this.page.getByText('Required').nth(2).isVisible();
    }

    async verifyRequiredField() {
        await this.page.getByText('Required').first().isVisible();
        await this.page.getByText('Required').nth(1).isVisible();
        await this.page.getByText('Required').nth(2).isVisible();
    }

    async clickCancel() {
        await this.cancelButton.click();
    }

    async verifyPageTitle(text){
        await this.page.getByRole('heading', { name: text }).isVisible();
    }
  
    async verifyPageTitle(value) {
        await expect(this.assertPageTitle).toHaveText(value);
    }
}

module.exports = { ClaimPage };
