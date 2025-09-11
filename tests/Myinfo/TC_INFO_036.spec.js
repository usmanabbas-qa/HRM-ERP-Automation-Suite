import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage.js';
import { MyInfoPage } from '../../pages/MyInfo.js';
import { AdminCorporateBrandingPage } from '../../pages/AdminCorporateBranding.js';

let login;
let myInfo;
let admincorporatebrandingpage

test.beforeEach(async ({ page }) => {
    login = new LoginPage(page);
    myInfo = new MyInfoPage(page);
    admincorporatebrandingpage = new AdminCorporateBrandingPage(page);
    await login.navigate();
    await login.verifySuccessfulllogin();
});

test("TC_INFO_036 - Upload Oversized Attachment (General)", async () => {
    await myInfo.clickMyInfoTab();
    await myInfo.navigateToImmigration();
    await myInfo.clickOnAttachmentTab();
    await admincorporatebrandingpage.uploadInvalidLogo();
    await myInfo.fileExceededError();

});

