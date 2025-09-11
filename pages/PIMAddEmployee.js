const { expect } = require('@playwright/test');

class PIMAddEmplyeePage {
    constructor(page) {
        this.page = page;
        this.assertAddEmplyee = this.page.locator(".oxd-text.oxd-text--h6.orangehrm-main-title");
        this.firstNameInput = this.page.locator('input[name="firstName"]');
        this.lastNameInput = this.page.locator('input[name="lastName"]');
        this.middleNameInput = this.page.locator('input[name="middleName"]');
        this.employeeIdInput = this.page.locator('.oxd-input.oxd-input--active').nth(3);
        this.errorMessage = this.page.locator('.oxd-text.oxd-text--span.oxd-input-field-error-message');
        this.userNameField = this. page.locator('div:nth-child(4) > .oxd-grid-2 > div > .oxd-input-group > div:nth-child(2) > .oxd-input')
        this.StatusField =this.page.getByText('StatusEnabledDisabled');
        this.passwordFiled = this.page.locator('input[type="password"]').first()
        this.confirmPassword = this.page.locator('input[type="password"]').nth(1)
        this.loginToggle = this.page.locator('form span');
        this.loginToggleOff = this.page.locator('div').filter({ hasText: /^Create Login Details$/ }).locator('span');
        this.userName = this.page.locator('.oxd-input.oxd-input--active').nth(4);
        this.passwordInput =this.page.locator('input[type="password"]').first();
        this.confirmPasswordInput = this.page.locator('input[type="password"]').nth(1);
        this.passMismatchError = this.page.getByText('Passwords do not match');
        this.employeeIdInput = this.page.locator('.oxd-input.oxd-input--active').nth(3);
        
    }

    async verifyErrorToast(message) {
        const errorToast = this.passMismatchError;
        await expect(errorToast).toHaveText(message);
    }
  
    async verifyAddEmplyeePage() {
        await expect(this.assertAddEmplyee).toHaveText('Add Employee')
    }

    async addCustomEmployeeID(firstName, middleName, lastName, employeeId) {
        await this.page.locator('input[placeholder="First Name"]').fill(firstName);
        await this.page.locator('input[placeholder="Middle Name"]').fill(middleName);
        await this.page.locator('input[placeholder="Last Name"]').fill(lastName);
        const employeeIdField = this.page.locator('input.oxd-input').nth(3);
        await employeeIdField.fill('');
        await employeeIdField.fill(employeeId);
        await this.page.getByText(' Save ', { exact: true });
    }

    async enterFirstName(firstName) {
        await this.firstNameInput.fill(firstName);
    }
  
    async enterLastName(lastName) {
        await this.lastNameInput.fill(lastName);
    }
  
    async enterMiddleName(middleName) {
        await this.middleNameInput.fill(middleName);
    }
  
    async enterNameField(fieldPlaceholder, value) {
        const input = this.page.locator(`input[placeholder='${fieldPlaceholder}']`);
        await input.fill(value);
    }

    async uploadProfilePicture() {
        const path = require('path');
        const filePath = path.resolve(__dirname, '../test-data/profileInvalidDimension.png');
        await this.page.setInputFiles('input[type="file"]', filePath);
    }

    async errorOnProfilePicture() {
        await expect(this.errorMessage).toHaveText('Attachment Size Exceeded');
    }

    async clickOnLoginToggle() {
        await this.loginToggle.click();
    }

    async verifyLoginToggleisOn() {
        await expect(this.userNameField).toBeVisible();
        await expect(this.StatusField).toBeVisible();
        await expect(this.passwordFiled).toBeVisible();
        await expect(this.confirmPassword).toBeVisible();
    }

    async clickOnLoginToggleOff() {
        await this.loginToggleOff.click();
    }

    async fillLoginDetails(username, password, confirmPassword) {
        await this.userNameField.fill(username);
        await this.passwordFiled.fill(password);
        await this.confirmPassword.fill(confirmPassword);
    }

    async verifyUserLoggedIn(fullname){
        await expect(this.page.getByRole('heading', { name: fullname })).toBeVisible();
    }

    async enterLoginDetails(username, password, confirmPassword) {
        await this.userName.fill(username);
        await this.passwordInput.fill(password);
        await this.confirmPasswordInput.fill(confirmPassword);
    }

    async enterEmployeeId(employeeId) {
        await this.employeeIdInput.fill(employeeId);
    }

    async enterLastNameField(fieldPlaceholder, value) {
        const input = this.page.locator(`input[placeholder='${fieldPlaceholder}']`);
        await input.fill(value);
    }

    async verifyProfilePictureUpload() {
        const uploadButton = this.page.locator('button.employee-image-action');
        await uploadButton.click();
        const path = require('path');
        const filePath = path.resolve(__dirname, '../test-data/brand.png');
        const fileInputs = this.page.locator('input[type="file"]');
        await fileInputs.setInputFiles(filePath);

    }

    async uploadInvalidImage() {
        const path = require('path');
        const filePath = path.resolve(__dirname, '../test-data/Invalid Image logo-exceeding 5 MB.jpg');
        await this.page.setInputFiles('input[type="file"]', filePath);
    }
}

module.exports = { PIMAddEmplyeePage };