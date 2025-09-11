import { test, expect } from '@playwright/test';
import { ResetPasswordPage } from '../../pages/ResetPassword.js';
import { Users } from '../../test-data/logindata.js';
import { LoginPage } from '../../pages/LoginPage.js';

let resetPassword;
let login;

test.beforeEach(async ({ page }) => {
    resetPassword = new ResetPasswordPage(page);
    login = new LoginPage(page);
    await login.navigate();
});

test('TC_RESET_PASSWORD_001: Valid Reset Password Request', async () => {
    await resetPassword.clickForgetPassword();
    await resetPassword.enterUserName(Users.username);
    await resetPassword.clickSubmitButton();
    await resetPassword.getSuccessMessage();
});

test('TC_RESET_PASSWORD_002: Empty Username Submission', async () => {
    await resetPassword.clickForgetPassword();
    await resetPassword.clickSubmitButton();
    await resetPassword.getErrorMessage();
});

test('TC_RESET_PASSWORD_003: Cancel Reset Password Request', async () => {
    await resetPassword.clickForgetPassword();
    await resetPassword.enterUserName(Users.username);
    await resetPassword.clickCancelButton();
});

test('TC_RESET_PASSWORD_004: Verify Reset Password Title', async ({ page }) => {
    await resetPassword.clickForgetPassword();
    await resetPassword.verifyResetPasswordTitle();
});

test('TC_RESET_PASSWORD_005: Valid Reset Password Request', async () => {
    await resetPassword.clickForgetPassword();
    await resetPassword.verifyUserNameField();
    await resetPassword.verifyPlaceholderText();
});

test('TC_RESET_PASSWORD_006: The instructional text "Please enter your username to identify your account to reset your password" is correctly displayed', async () => {
    await resetPassword.clickForgetPassword();
    await resetPassword.verifyTextVisibility();
});

test('TC_RESET_PASSWORD_007: The "Reset Password Page" layout adjusts correctly in every browser', async () => {
    await resetPassword.clickForgetPassword();
    await resetPassword.enterUserName(Users.username);
    await resetPassword.clickSubmitButton();
    await resetPassword.getSuccessMessage();
  // set --project = 'chromium' or 'firefox' or 'webkit' in your test command to run this test in different browsers by setting  config file 
});
