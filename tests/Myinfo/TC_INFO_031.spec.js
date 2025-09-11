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

test('TC_INFO_031 - Add New Language', async () => {
    await myInfo.clickMyInfoTab();
    await myInfo.verifyMyInfoPage();
    await myInfo.clickQualificationTab();
    await myInfo.clickOnLanguageTab();
    await myInfo.addLanguage("Arabic", "Speaking", "Good");
    await adminEducationPage.clickSaveButton();
    await adminConfigurationPage.verifySuccessToast();

});
