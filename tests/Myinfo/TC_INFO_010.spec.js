import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage.js';
import { MyInfoPage } from '../../pages/MyInfo.js';
import { AdminCorporateBrandingPage } from '../../pages/AdminCorporateBranding.js';
import { AdminConfigurationPage } from '../../pages/AdminConfigurations.js';

let login;
let myInfo;
let adminCorporateBranding;
let adminConfiguration;

test.beforeEach(async ({ page }) => {
    login = new LoginPage(page);
    myInfo = new MyInfoPage(page);
    adminCorporateBranding = new AdminCorporateBrandingPage(page);
    adminConfiguration = new AdminConfigurationPage(page);
    await login.navigate();
    await login.verifySuccessfulllogin();
});

test('TC_INFO_010: Update Employees Work Email (Positive)', async () => {
    await myInfo.clickMyInfoTab();
    await myInfo.verifyMyInfoPage();
    await myInfo.navigateToContactDetails();
    await myInfo.enterWorkEmailInput("bbss.stein@example.com");
    await myInfo.clickOnSaveButton();
    await myInfo.verifySuccessMessage();
});