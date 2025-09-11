const { expect } = require('@playwright/test');

class AdminNationalityPage {
    constructor(page) {
        this.page = page;
        this.clickNationalities = this.page.locator("//a[normalize-space()='Nationalities']");
        this.table = this.page.locator("div[role='table']");
        this.addButton = this.page.getByRole('button', { name: 'Add' });
        this.nationalityName = this.page.locator('form').getByRole('textbox');
        this.saveBtn = this.page.getByRole('button', { name: 'Save' });
        this.success = this.page.getByText('Success', { exact: true });
        this.nationalityErrorMessage = this.page.getByText('Already exists', { exact: true });
        this.requiredFieldError = this.page.getByText('Required', { exact: true });
        this.cancelButton = this.page.getByRole('button', { name: 'Cancel' });
        this.nextButton = this.page.locator('button.oxd-pagination-page-item--previous-next').nth(1);;
        this.deleteIcon = page.locator('i.oxd-icon.bi-trash');
        this.confirmDeleteButton = page.locator('button:has-text("Yes, Delete")');
        this.selectAllCheckbox = this.page.locator('div.oxd-table-header .oxd-checkbox-wrapper');
        this.pageTitle = this.page.getByRole('heading', { name: 'Nationalities' });
    }
    async clickOnNationalities() {
        await this.clickNationalities.click();
    }

    async assertNationalitiesTable() {
        await expect(this.table).toBeVisible();
    }

    async clickAddnationality() {
        await this.addButton.click();
    }

    async AddNationalityName(nationalityName = 'KSA') {
        await this.nationalityName.fill(nationalityName);
    }

    async AddNewNationalityNameEveryTime(){
        const nationalities = [
        "American", "Canadian", "Pakistani", "Indian", "British", 
        "French", "German", "Turkish", "Egyptian", "Brazilian",
        "Saudi", "Japanese", "Chinese", "South African", "Australian"
        ];

        const randomIndex = Math.floor(Math.random() * nationalities.length);
        const baseNationality = nationalities[randomIndex];

        const randomSuffix = Math.floor(Math.random() * 10000);
        const nationalityName = `${baseNationality}_${randomSuffix}`;

        await this.nationalityName.fill(nationalityName);

        return nationalityName;
    }

    async clickSave() {
        await this.saveBtn.click();
    }

    async nationalityAddedSuccessfully() {
        await expect(this.success).toBeVisible();
    }

    async verifyNationalityErrorMessage() {
        await expect(this.nationalityErrorMessage).toBeVisible();
    }

    async verifyRequiredFieldErrorMessage() {
        await expect(this.requiredFieldError).toBeVisible();
    }

    async clearNationalityName() {
        await this.nationalityName.fill('');
    }

    async clickCancelButton() {
        await this.cancelButton.click();
    }

    async paginateAllPages() {
        while (await this.nextButton.isVisible() && await this.nextButton.isEnabled()) {
            await this.nextButton.click();
        }
    }
    async clickDeleteIcon(index) {
        await this.deleteIcon.nth(index).click();
        await this.confirmDeleteButton.click();
    }

    async clickOnAllNationalityCheckbox() {
        await this.selectAllCheckbox.click();
    }

    async verifyPageTitle(expectedTitle) {
        await expect(this.pageTitle).toHaveText(expectedTitle); ;
    }
}

module.exports = { AdminNationalityPage }