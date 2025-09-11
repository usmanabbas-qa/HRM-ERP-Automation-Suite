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

test('TC_INFO_011:  Update Address Fields', async () => {
    await myInfo.clickMyInfoTab();
    await myInfo.verifyMyInfoPage();
    await myInfo.navigateToContactDetails();
    await myInfo.enterAddress("123 Main St", "Apt 4B", "New York", "NY", "10001", "Brazil");
    await myInfo.clickOnSaveButton();
    await adminConfiguration.verifyDateUpdateSuccessToast();
});