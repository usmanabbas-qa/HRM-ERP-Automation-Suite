import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage.js';
import { MyInfoPage } from '../../pages/MyInfo.js';
import { AdminEducationPage } from '../../pages/AdminEducation.js';
import { PerformancePage } from '../../pages/Performance.js';

let login;
let myInfo;
let adminEducation;
let performance

test.beforeEach(async ({ page }) => {
    login = new LoginPage(page);
    myInfo = new MyInfoPage(page);
    adminEducation = new AdminEducationPage(page);
    performance = new PerformancePage(page);
    await login.navigate();
    await login.verifySuccessfulllogin();
});

test('TC_Info_005:  Update License Expiry Date', async () => {
    await myInfo.clickMyInfoTab();
    await myInfo.verifyMyInfoPage();
    await performance.selectCalender(0);
    await performance.selectDate(3); 
    await performance.clickSaveButton(0);
    await adminEducation.verifySuccessToast(); 
});
