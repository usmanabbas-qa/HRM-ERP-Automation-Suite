import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage.js';
import { MyInfoPage } from '../../pages/MyInfo.js';
import { AdminCorporateBrandingPage } from '../../pages/AdminCorporateBranding.js';

let login;
let myInfo;
let adminCorporateBranding;

test.beforeEach(async ({ page }) => {
    login = new LoginPage(page);
    myInfo = new MyInfoPage(page);
    adminCorporateBranding = new AdminCorporateBrandingPage(page);
    await login.navigate();
    await login.verifySuccessfulllogin();
});

test('TC_INFO_009: Verify Navigation to Contact Details', async () => {
    await myInfo.clickMyInfoTab();
    await myInfo.verifyMyInfoPage();
    await myInfo.navigateToContactDetails();
});