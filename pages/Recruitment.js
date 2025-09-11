const { expect } = require('@playwright/test');
const { addAbortListener } = require('events');
const { constrainedMemory } = require('process');

class RecruitmentPage {
    constructor(page) {
        this.page = page;
        this.reccruitmentTab = this.page.locator("[href*='viewRecruitmentModule']");
        this.assertRecruitmentPage = this.page.locator(".oxd-text.oxd-text--h6.oxd-topbar-header-breadcrumb-module")
        this.errorMsgNumberRange = this.page.getByText('Should be a number between 1-999');
        this.alphabetErrorRange = this.page.getByText('Should be a numeric value');
        this.heading = this.page.getByRole('heading', { name: 'Candidates' });
        this.candidateColumn = this.page.getByRole('columnheader', { name: 'Candidate ' });
        this.invalidMessage = this.page.getByText('Invalid');
        this.searchBtn = this.page.getByRole('button', { name: 'Search' });
        this.nameField = this.page.getByRole('textbox', { name: 'Type for hints...' });
        this.rejectBtn = this.page.getByRole('button', { name: 'Reject' });
        this.viewButton = this.page.locator('.oxd-icon.bi-eye-fill');
        this.addButton = this.page.getByRole('button', { name: ' Add ' });
        this.nameInput = this.page.getByRole('textbox', { name: 'First Name' });
        this.middleNameInput = this.page.getByRole('textbox', { name: 'Middle Name' });
        this.lastNameInput = this.page.getByRole('textbox', { name: 'Last Name' });
        this.emailInput = this.page.locator("input[placeholder='Type here']").first();
        this.contactNoInput = this.page.locator("input[placeholder='Type here']").nth(1);
        this.shortlistBtn = this.page.getByRole('button', { name: 'Shortlist' });
        this.assertRecruitmentPage = this.page.locator(".oxd-text.oxd-text--h6.oxd-topbar-header-breadcrumb-module");
        this.vacancyNameField = this.page.locator('input.oxd-input.oxd-input--active').nth(1);
        this.hiringManagerField = this.page.locator('input[placeholder="Type for hints..."]').nth(0);
        this.emailField = this.page.locator('input[placeholder="Type here"]').nth(0);
        this.viewIcon = this.page.locator('.oxd-icon.bi-eye-fill');
        this.addbutton = this.page.getByRole('button', { name: ' Add' });
        this.EditVacancy = this.page.getByRole('row').getByRole('button').first();
        this.deleteVacancy = this.page.getByRole('row').getByRole('button').nth(1);
        this.RSSLink = this.page.getByRole('link', { name: 'https://opensource-demo.orangehrmlive.com/web/index.php/recruitmentApply/jobs.rss' });
        this.webPageUrl = this.page.getByRole('link',{name :"https://opensource-demo.orangehrmlive.com/web/index.php/recruitmentApply/jobs.html"})
    }

    async clickRecruitmentTab() {
        await this.reccruitmentTab.click();
    }

    async verifyRecruitmentPage() {
        await expect(this.assertRecruitmentPage).toHaveText('Recruitment');
    }

    async verifyNumberRangeError() {
        await expect(this.errorMsgNumberRange).toHaveText('Should be a number between 1-999');
    }

    async alphabetError() {
        await expect(this.alphabetErrorRange).toHaveText('Should be a numeric value');
    }

    async editJob(index, newValue) {
        const textbox = this.page.getByRole('textbox').nth(4);
        await textbox.dblclick();
        await textbox.fill(newValue);
    }

    async invalidError() {
        await expect(this.invalidMessage).toHaveText('Invalid');
    }

    async verifyCandidatesPage() {
        await expect(this.heading).toHaveText('Candidates');
        await expect(this.candidateColumn).toBeVisible();
    }

    async searchByCandidateName(name) {
        await this.nameField.click();
        await this.nameField.fill(name);
        await this.page.getByRole('option', { name }).first().click();
        await this.searchBtn.click();
        await expect(this.page.getByRole('cell', { name })).toBeVisible();
    }

    async filterByStatus(status) {
        await this.page.locator('div:nth-child(4) .oxd-select-wrapper .oxd-icon').click();
        await this.page.getByRole('option', { name: status }).click();
        await this.searchBtn.click();
    }

    async clickReject() {
        await this.rejectBtn.click();
    }
    async clickViewButton(index) {
        await this.viewButton.nth(index).click();
    }

    async clickAddButton() {
        await this.addButton.click();
    }

    async enterEmail(email) {
        await this.emailInput.fill(email);
    }
    async enterContactNo(contactNo) {
        await this.contactNoInput.fill(contactNo);
    }
    async enterName(name) {
        await this.nameInput.fill(name);
    }
    async enterMiddleName(middleName) {
        await this.middleNameInput.fill(middleName);
    }

    async enterLastName(lastName) {
        await this.lastNameInput.fill(lastName);
    }

    async clickShortlist() {
        await this.shortlistBtn.click();
    }

    async verifyRecruitmentPage() {
        await expect(this.assertRecruitmentPage).toHaveText('Recruitment');
    }

    async enterVacancyField(name) {
        await this.vacancyNameField.fill(name);
    }

    async enterHiringManagerField(name) {
        await this.hiringManagerField.fill(name);
    }

    async enterEmailField(email) {
        await this.emailField.fill(email);
    }

    async verifyRequiredFieldErrorByIndex(index, fieldName) {
        const error = this.page.locator('.oxd-input-field-error-message').nth(index);
        await expect(error, `Missing 'Required' error for ${fieldName}`).toBeVisible();
        await expect(error).toHaveText('Required');
    }

    async clickViewButton(index) {
        await this.viewIcon.nth(index).click();
    }

    async searchByCandidateName(name) {
        await this.page.getByRole('textbox', { name: 'Type for hints...' }).fill(name);
        await this.page.getByRole('option', { name: name }).first().click();
    }

    async searchByKeywords(keyword) {
        await this.page.getByRole('textbox', { name: 'Enter comma seperated words...' }).fill(keyword);
    }

    async addCandidate() {
        await this.page.getByRole('button', { name: ' Add' }).click();
    }

    async addFirstName(name) {
        await this.page.getByRole('textbox', { name: 'First Name' }).fill(name);
    }

    async addLastName(name) {
        await this.page.getByRole('textbox', { name: 'Last Name' }).fill(name);
    }

    async addEmail(email) {
        await this.page.getByRole('textbox', { name: 'Type here' }).first().fill(email);
    }

    async addkeyword(word) {
        await this.page.getByRole('textbox', { name: 'Enter comma seperated words...' }).fill(word);
    }

    async clickAddbutton() {
        await this.addbutton.click();
    }

    async enterFirstName(text) {
        await this.page.getByRole('textbox', { name: 'First Name' }).fill(text);
    }

    async enterLastName(text) {
        await this.page.getByRole('textbox', { name: 'Last Name' }).fill(text);
    }

    async selectVacancyDropDown(text) {
        await this.page.locator('form i').first().click();
        await this.page.getByRole('option', { name: text }).click();
    }

    async enterEmail(text) {
        await this.page.getByRole('textbox', { name: 'Type here' }).first().fill(text);
    }

    async clickSaveButton() {
        await this.page.getByRole('button', { name: 'Save' }).click();
    }

    async clickCancelButton() {
        await this.page.getByRole('button', { name: 'Cancel' }).click();
    }

    async emailFieldError() {
        await this.page.getByText('Required', { exact: true }).isVisible();
        console.log("Required Email");
    }

    async clickEditVacancy() {
        await this.EditVacancy.click();
    }

    async clickEditToggle() {
        await this.page.locator('label').filter({ hasText: 'Edit' }).locator('span').click();
    }

    async candidateListVisible() {
        await this.page.locator('.orangehrm-container').isVisible();
    }

    async clickDeleteVacancy() {
        await this.deleteVacancy.click();
        await this.page.getByRole('button', { name: ' Yes, Delete' }).click();
        console.log("Record Deleted");
    }

    async cancelDeleteVacancy() {
        await this.deleteVacancy.click();
        await this.page.getByRole('button', { name: 'No, Cancel' }).click();
        console.log("Cancel Deleted");
    }

    async verifyClientBrandLogoUpload() {
        const path = require('path');
        const filePath = path.resolve(__dirname, '../test-data/Salma-Hafiza- Resume.pdf');
        const fileInputs = this.page.locator('input[type="file"]');
        await fileInputs.nth(0).setInputFiles(filePath);
    }
  
    async verifyRSSLink() {
        await expect(this.RSSLink).toHaveAttribute('href', 'https://opensource-demo.orangehrmlive.com/web/index.php/recruitmentApply/jobs.rss');
    }
  
    async clickResetButton(){
        await this.page.getByRole('button', { name: 'Reset' }).click();
    }
}

module.exports = { RecruitmentPage }