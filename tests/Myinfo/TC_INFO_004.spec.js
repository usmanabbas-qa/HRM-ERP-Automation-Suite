import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage.js';
import { MyInfoPage } from '../../pages/MyInfo.js';
import { AdminEducationPage } from '../../pages/AdminEducation.js';

let login;
let myInfo;
let adminEducation

test.beforeEach(async ({ page }) => {
    login = new LoginPage(page);
    myInfo = new MyInfoPage(page);
    adminEducation = new AdminEducationPage(page)
    await login.navigate();
    await login.verifySuccessfulllogin();
});

test('TC_Info_004: Update Employee ID (Positive)', async () => {
    await myInfo.clickMyInfoTab();
    await myInfo.verifyMyInfoPage();
    await myInfo.enterDataMyInfo(4, "23456765432")
    await adminEducation.clickSaveButton();
    await adminEducation.verifySuccessToast(); 
});
