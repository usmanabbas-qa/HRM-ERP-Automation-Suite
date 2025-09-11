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

test('TC_INFO_008: Upload Oversized Profile Picture', async () => {
    await myInfo.clickMyInfoTab();
    await myInfo.verifyMyInfoPage();
    await myInfo.clickonEmployeeImage();
    await myInfo.uploadInvalidFile("Invalid Image logo-exceeding 5 MB.jpg");
    await myInfo.clickOnSaveButton();
    await myInfo.uploadFileError('Attachment size Exceeded');
});