const { expect } = require('@playwright/test');

class AdminEducationPage {
    constructor(page) {
        this.page = page;
        this.deleteIcon = this.page.locator('.oxd-icon.bi-trash');
        this.confirmDeleteBtn = this.page.getByRole('button', { name: 'Yes, Delete' });
        this.editIcon = this.page.locator('.oxd-icon.bi-pencil-fill');
        this.saveButton = page.getByRole('button', { name: 'Save' });
        this.successToast = page.locator('.oxd-toast-content');
        this.addButton = this.page.getByRole('button', { name: 'Add' });
        this.recordsFound = this.page.getByText(/\(\d+\) Records Found/);
        this.assertAddPage = page.locator(".oxd-text.oxd-text--h6.orangehrm-main-title");
        //this.addButton = this.page.getByRole('button', { name: 'Add' });
        //this.recordsFound = this.page.locator('.oxd-text.oxd-text--span.oxd-table-pagination-total');
        // this.recordsFound = this.page.getByText(/\(\d+\) Records Found/);
        this.addMemberShip = this.page.locator('form').getByRole('textbox');
    }
    async clickDeleteIcon(elementIndex) {
        await this.deleteIcon.nth(elementIndex).click();
    }
    async confirmDelete() {
        await this.confirmDeleteBtn.click();
    }
    async clickEditIcon(elementIndex) {
        await this.editIcon.nth(elementIndex).click();
    }
    async clickSaveButton() {
        await this.saveButton.click();
    }
    async verifySuccessToast() {
        await expect(this.successToast).toBeVisible();
        await this.successToast.waitFor({ state: 'visible', timeout: 5000 });
        await expect(this.successToast).toContainText('Success');
    }

    async clickAddButton() {
        await expect(this.addButton).toBeVisible();
        await this.addButton.click();
        await expect(this.page).toHaveURL(/.*saveSkills/);
        console.log("Verify 'Add' button functionality is present, clickable and redirect to Add Skill Page.");
    }

    // async verifyRecordsCount() {
    //     await expect(this.recordsFound).toHaveText(/\(\d+\) Record Found/);
    // }

    async verifyAddEducationPage() {
        await expect(this.assertAddPage).toHaveText("Add Education");
    }

    async verifyPageTitle(value) {
        await expect(this.assertAddPage).toHaveText(value);
    }
    async verifyRecordsCount() {
        const recordText = await this.recordsFound.textContent();
        // expect(this.recordsFound);
        console.log('the count is', recordText);
    }

    async clickOnAddButton() {
        await this.addButton.click();
    }

    async addMemberShipName(memberName) {
        
        await this.addMemberShip.fill(memberName);
    }

    async verifyDeleteConfirmationDialog() {
        await expect(this.confirmDeleteBtn).toBeVisible();
    }
}

module.exports = { AdminEducationPage };