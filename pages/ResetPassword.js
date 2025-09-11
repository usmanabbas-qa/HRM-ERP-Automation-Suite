const { expect } = require('@playwright/test');
import { Users } from '../test-data/logindata.js';

class ResetPasswordPage {
    constructor(page) {
        this.page = page;

        this.userNameInput = this.page.locator("input[placeholder='Username']");
        this.submitButton = this.page.locator('button[type="submit"]');
        this.successMessage = this.page.locator('.oxd-text.oxd-text--h6.orangehrm-forgot-password-title');
        this.forgetPassword = this.page.locator('.oxd-text.oxd-text--p.orangehrm-login-forgot-header');
        this.errorMessage = this.page.locator('span.oxd-input-field-error-message');
        this.cancelButton = this.page.locator('button.orangehrm-forgot-password-button--cancel');
        this.resetPasswordTitle = this.page.locator('h6.orangehrm-forgot-password-title');
        this.placeholder =  page.locator('input[name="username"]');
        this.textVisibility = page.locator('p.oxd-text.oxd-text--p').nth(1);
    }

    async clickForgetPassword() {
        await this.forgetPassword.click();
    }

    async enterUserName(userName) {
        await this.userNameInput.fill(userName);
    }

    async clickSubmitButton() {
        await this.submitButton.click();
    }

    async getSuccessMessage() {
        await expect(this.successMessage).toContainText('Reset Password link sent successfully');
    }

    async getErrorMessage() {
        await expect(this.errorMessage).toHaveText('Required');
    }

    async clickCancelButton() {
        await this.cancelButton.click();
        await this.page.waitForURL('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    }

    async verifyResetPasswordTitle() {
        await expect(this.resetPasswordTitle).toHaveText('Reset Password');
    }
    async verifyUserNameField(){
      await expect(this.userNameInput).toBeVisible();
    }
      
    async verifyPlaceholderText() {
        await expect(this.placeholder).toHaveAttribute('placeholder', 'Username');
    }
      
    async verifyTextVisibility() {
        await expect(this.textVisibility).toHaveText("Please enter your username to identify your account to reset your password");
    }
}

module.exports = { ResetPasswordPage };