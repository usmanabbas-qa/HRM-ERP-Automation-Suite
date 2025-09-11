import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage.js';
import { LeavePage } from '../../pages/Leave.js';
import { TimePage } from '../../pages/Time.js';
import { MyInfoPage } from '../../pages/MyInfo.js';

let login;
let leave;
let time;
let myInfo;

test.beforeEach(async ({ page }) => {
    login = new LoginPage(page);
    leave = new LeavePage(page);
    time = new TimePage(page);
    myInfo = new MyInfoPage(page);
    await login.navigate();
    await login.verifySuccessfulllogin();
});

test('TC_LV_047 - Delete an existing ""Leave Type""', async () => {
    await leave.clickleaveTab();
    await leave.verifyleavePage();
    await time.clickTopMenu('Configure');
    await time.selectDropDownItem('Leave Types');
    await myInfo.clickDelete();
});