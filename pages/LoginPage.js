const { expect } = require('@playwright/test');
import { Users } from '../test-data/logindata.js';

class LoginPage {
    constructor(page) {
        this.page = page;
        this.userNameInput = this.page.locator('input[name="username"]');
        this.passwordInput = this.page.locator('input[name="password"]');
        this.loginButton = this.page.locator('button[type="submit"]');
        this.errorMessage = this.page.locator('.oxd-text.oxd-text--p.oxd-alert-content-text');
        this.linkedinIcon = this.page.locator('a[href*="linkedin.com"]');
        this.facebookIcon = this.page.locator('a[href*="facebook.com"]');
        this.twitterIcon = this.page.locator('a[href*="twitter.com"]');
        this.youtubeIcon = this.page.locator('a[href*="youtube.com"]');
        this.requiredField = this.page.locator('.oxd-input-field-error-message');
        this.forgetPasswordLink = this.page.locator('.oxd-text.oxd-text--p.orangehrm-login-forgot-header');
        this.logo = this.page.getByAltText('company-branding');
    }

    async navigate() {
        await this.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    }
    async enterUsername(username) {
        await this.userNameInput.fill(username);
    }

    async enterPassword(password) {
        await this.passwordInput.fill(password);
    }
  
    async clickLoginButton() {
        await this.loginButton.click();
    }
  
    async getErrorMessage() {
        await expect(this.errorMessage).toHaveText('Invalid credentials');
    }
  
    async verifySuccessfulllogin(){
        await this.userNameInput.fill(Users.username);
        await this.passwordInput.fill(Users.password);
        await this.loginButton.click();
    }

    async verifysocialMediaIcons() {
        const [linkedinTab] = await Promise.all([
            this.page.context().waitForEvent('page'),
            this.linkedinIcon.click(),
        ]);
        await linkedinTab.waitForLoadState('load');
        await expect(linkedinTab).toHaveURL(/linkedin\.com/);
        await linkedinTab.close();

        const [facebookTab] = await Promise.all([
            this.page.context().waitForEvent('page'),
            this.facebookIcon.click(),
        ]);
        await facebookTab.waitForLoadState('load');
        await expect(facebookTab).toHaveURL(/facebook\.com/);
        await facebookTab.close();

        const [twitterTab] = await Promise.all([
            this.page.context().waitForEvent('page'),
            this.twitterIcon.click(),
        ]);
        await twitterTab.waitForLoadState('load');
        await expect(twitterTab).toHaveURL(/x\.com/);
        await twitterTab.close();

        const [youtubeTab] = await Promise.all([
            this.page.context().waitForEvent('page'),
            this.youtubeIcon.click(),
        ]);
        await youtubeTab.waitForLoadState('load');
        await expect(youtubeTab).toHaveURL(/youtube\.com/);
        await youtubeTab.close();
        await expect(this.page).toHaveURL("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
    }
  
    async verifyRequiredField() {
        await expect(this.requiredField).toHaveText('Required');
    }
  
    async verifyRequiredFieldForField(fieldName) {
        const input = this.page.locator(`input[name="${fieldName}"]`);
        const errorMessage = input.locator('..').locator('..').locator('.oxd-input-field-error-message');
        await expect(errorMessage).toHaveText('Required');
    }

    async clickOnForgetPasswordLink(){
        await this.forgetPasswordLink.click();
    }
  
    async verifyForgetPasswordPage(){
        await expect(this.page.url()).toBe('https://opensource-demo.orangehrmlive.com/web/index.php/auth/requestPasswordResetCode')
    }
  
     async verifyLogoOnLoginPage(){
        await expect(this.logo).toBeVisible();
    }
  
     async verifyPasswordMasked(){
        await expect(this.passwordInput).toHaveAttribute('type', 'password')
    }   
}
module.exports = { LoginPage };