import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage.js';
import { MyInfoPage } from '../../pages/MyInfo.js';
import {  AdminEducationPage } from '../../pages/AdminEducation.js';
import { AdminConfigurationPage } from '../../pages/AdminConfigurations.js';


let login;
let myInfo;
let adminEducationPage;
let adminConfigurationPage;


test.beforeEach(async ({ page }) => {
    login = new LoginPage(page);
    myInfo = new MyInfoPage(page);
    adminEducationPage = new AdminEducationPage(page);
    adminConfigurationPage = new AdminConfigurationPage(page);
    await login.navigate();
    await login.verifySuccessfulllogin();
});

test('TC_INFO_029 - Add New Education Record', async () => {
    await myInfo.clickMyInfoTab();
    await myInfo.verifyMyInfoPage();
    await myInfo.clickQualificationTab();
    await myInfo.clickAddEducationTab();
    await myInfo.selectEducationLevel("High School Diploma");
    await adminEducationPage.clickSaveButton();
    await adminConfigurationPage.verifySuccessToast();
});
