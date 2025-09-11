import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage.js';
import { Users } from '../../test-data/logindata.js';
import { DashboardPage } from '../../pages/Dashboard.js';

let login;
let dashboard;

test.beforeEach(async ({ page }) => {
    login = new LoginPage(page);
    dashboard = new DashboardPage(page);
    await login.navigate();
});

test('TC_LOGIN_001: Valid Login with Correct Credential', async () => {
    await login.enterUsername(Users.username);
    await login.enterPassword(Users.password);
    await login.clickLoginButton();
});

test('TC_LOGIN_002: Invalid Login - Incorrect Username', async () => {
    await login.enterUsername(Users.inValidUsername);
    await login.enterPassword(Users.password);
    await login.clickLoginButton();
    await login.getErrorMessage()
});

test('TC_LOGIN_003: Invalid Login - Incorrect Password', async () => {
    await login.enterUsername(Users.username);
    await login.enterPassword(Users.inValidPassword);
    await login.clickLoginButton();
    await login.getErrorMessage()
});

test('TC_LOGIN_004: Invalid Login - Both Incorrect', async () => {
    await login.enterUsername(Users.inValidUsername);
    await login.enterPassword(Users.inValidPassword);
    await login.clickLoginButton();
    await login.getErrorMessage();
});

test('TC_LOGIN_005: Empty Username Field', async () => {
    await login.enterUsername(Users.emptyUsername);
    await login.enterPassword(Users.inValidPassword);
    await login.clickLoginButton();
    await login.verifyRequiredFieldForField('username');
});

test('TC_LOGIN_006: Empty Password Field', async () => {
    await login.enterUsername(Users.username);
    await login.enterPassword(Users.emptyPassword);
    await login.clickLoginButton();
    await login.verifyRequiredFieldForField('password');
});

test('TC_LOGIN_007: Both fields Empty', async () => {
    await login.enterUsername(Users.emptyUsername);
    await login.enterPassword(Users.emptyPassword);
    await login.clickLoginButton();
    await login.verifyRequiredFieldForField('username');
    await login.verifyRequiredFieldForField('password');
});

test('TC_LOGIN_008: "Forgot your password?" Link Functionality', async() =>{
    await login.clickOnForgetPasswordLink();
    await login.verifyForgetPasswordPage();
});

test('TC_LOGIN_009: Logo Display', async()=>{
    await login.verifyLogoOnLoginPage();
});

test('TC_LOGIN_010: Password Field Obscurity', async() =>{
    await login.enterPassword(Users.password);
    await login.verifyPasswordMasked();
});

test(' TC_LOGIN_011: Cross Browser', async () =>{
    // npx playwright test -g "TC_LOGIN_011: Cross Browser" --headed --browser=chromium
    // npx playwright test -g "TC_LOGIN_011: Cross Browser" --headed --browser=firefox
    // npx playwright test -g "TC_LOGIN_011: Cross Browser" --headed --browser=webkit
})

test('TC_LOGIN_012: Verify Social Media Icons', async () => {
    test.setTimeout(60_000);
    await login.verifysocialMediaIcons();
});

