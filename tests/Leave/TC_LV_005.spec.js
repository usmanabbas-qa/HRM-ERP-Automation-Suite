import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage.js';
import { LeavePage } from '../../pages/Leave.js';

let login;
let leave;

test.beforeEach(async ({ page }) => {
    login = new LoginPage(page);
    leave = new LeavePage(page);
    await login.navigate();
    await login.verifySuccessfulllogin();
});

test('TC_LV_005: Apply Leave with ""From Date"" after ""To Date""', async () => {
    await leave.clickleaveTab();
    await leave.verifyleavePage();
    await leave.selectDate(0, "2023-10-10");
    await leave.selectDate(1, "2023-09-10");
    await leave.errorOnLeavedate();
});