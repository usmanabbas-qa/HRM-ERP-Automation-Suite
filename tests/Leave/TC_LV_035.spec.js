import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage.js';
import { LeavePage } from '../../pages/Leave.js';
import { TimePage } from '../../pages/Time.js';

let login;
let leave;
let time;

test.beforeEach(async ({ page }) => {
    login = new LoginPage(page);
    leave = new LeavePage(page);
    time = new TimePage(page);
    await login.navigate();
    await login.verifySuccessfulllogin();
});

test('TC_LV_035 - Assign Leave to an Employee (Positive)', async () => {
    await leave.clickleaveTab();
    await leave.verifyleavePage();
    await time.clickTopMenu('Assign Leave');
    await leave.employee_name('Ranga  Akunuri');
    await leave.leaveType('CAN - Bereavement')
    await leave.dateSelector('2025-21-08','2025-22-08');
    await leave.assignButton();
});