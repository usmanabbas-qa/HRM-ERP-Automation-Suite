import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage.js';
import { MyInfoPage } from '../../pages/MyInfo.js';
import { AdminEducationPage } from '../../pages/AdminEducation.js';

let login;
let myInfo;
let adminEducation;

test.beforeEach(async ({ page }) => {
    login = new LoginPage(page);
    myInfo = new MyInfoPage(page);
    adminEducation = new AdminEducationPage(page);
    await login.navigate();
    await login.verifySuccessfulllogin();
});

test('TC_MyInfo_016:  Delete Emergency Contact', async () => {
    await myInfo.clickMyInfoTab();
    await myInfo.verifyMyInfoPage();
    await myInfo.clickNavbarItem("Emergency Contacts");
    await myInfo.clicEmergencyContactAddButton();
    await myInfo.enterInputByIndex(2, "maria");
    await myInfo.enterInputByIndex(3, "sister");
    await myInfo.enterInputByIndex(5, " ");
    await adminEducation.clickSaveButton();
});