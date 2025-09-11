import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage.js';
import { PerformancePage } from '../../pages/Performance.js';
import { MyInfoPage } from '../../pages/MyInfo.js';


let login;
let performance;
let myInfo;

test.beforeEach(async ({ page }) => {
    login = new LoginPage(page);
    performance = new PerformancePage(page);
    myInfo = new MyInfoPage(page);
    await login.navigate();
    await login.verifySuccessfulllogin();
});


test('TC_INFO_020: Verify Job Details Display', async () => {
    await myInfo.clickMyInfoTab();
    await myInfo.navigateToJobPage();
    await myInfo.assertJobDetails();
    await myInfo.assertJoinDate();
    await myInfo.assertJobTitle();
});