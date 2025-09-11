const { expect } = require('@playwright/test');

class AdminJob {
    constructor(page) {
        this.page = page;
        this.addButtonOnPageGrade = this.page.getByRole('button', { name: 'Add' });
        this.editIcon = this.page.locator('.oxd-icon.bi-pencil-fill');
        this.jobTitleInput = this.page.locator("div[class='oxd-input-group oxd-input-field-bottom-space'] div input[class='oxd-input oxd-input--active']");
        this.assertJobTitlePage = page.locator(".oxd-text.oxd-text--h6.orangehrm-main-title");
        this.pageTitle = this.page.locator("h6.oxd-text.oxd-text--h6.orangehrm-main-title");
        this.recordsFound = this.page.locator('text=/\\(\\d+\\) Records? Found/');
        this.jobHeaders = this.page.locator("div[class='oxd-table-header'] div[role='row']");
        this.deleteIcon = page.locator('i.oxd-icon.bi-trash');
        this.confirmDeleteButton = page.locator('button:has-text("Yes, Delete")');
    }

    async verifyAddButtonFunctionality() {
        await this.addButtonOnPageGrade.click();
    }


    async clickEditIcon(elementIndex) {
        await this.editIcon.nth(elementIndex).click();
    }

    async editJobTitle(jobTitle) {
        await this.jobTitleInput.fill(jobTitle);
    }

    async verifyJobTitilePage() {
        await expect(this.assertJobTitlePage).toHaveText('Job Titles')
    }

    async verifyRecordsCount() {
        await expect(this.recordsFound).toHaveText(/ *\(\d+\) Records? Found/);
    }

    async verifyPageTitle(expectedTitle) {
        await expect(this.pageTitle.filter({ hasText: expectedTitle })).toHaveText(expectedTitle);
    }

    async verifyHeader(text) {
        await expect(this.jobHeaders.filter({ hasText: text })).toBeVisible();
    }

    async clickDeleteIcon(index) {
        await this.deleteIcon.nth(index).click();
        await this.confirmDeleteButton.click();
    }

    async clickAdd() {
        await this.page.getByRole('button', { name: ' Add' }).click();
    }
}

module.exports = { AdminJob };

