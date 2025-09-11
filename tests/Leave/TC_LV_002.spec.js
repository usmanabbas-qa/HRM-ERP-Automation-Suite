import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage.js';
import { LeavePage } from '../../pages/Leave.js';
import { MyInfoPage } from '../../pages/MyInfo.js';


let login;
let leave;
let myInfo;


test.beforeEach(async ({ page }) => {
    login = new LoginPage(page);
    leave = new LeavePage(page);
    myInfo = new MyInfoPage(page);

    await login.navigate();
    await login.verifySuccessfulllogin();
});

test('TC_LV_002: Apply Leave with valid data (Single Day)', async () => {
    await leave.clickleaveTab();
    await leave.verifyleavePage();
    await myInfo.selectDate(0, '2019-01-14');
    await myInfo.selectDate(1, '2018-11-18');
    await leave.selectLeaveStatusScheduled();
    await leave.selectLeaveTypePersonal();
    await leave.searchEmployee('saima')
    await leave.selectSubunitAdministration();
    await leave.clickSearchButton();
    await leave.clickInvalidMessage();
});