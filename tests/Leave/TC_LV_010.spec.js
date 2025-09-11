import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage.js';
import { LeavePage } from '../../pages/Leave.js';
import { AdminOrganizationPage } from '../../pages/AdminOrganization.js';

let login;
let leave;
let adminOrganization;

test.beforeEach(async ({ page }) => {
    login = new LoginPage(page);
    leave = new LeavePage(page);
    adminOrganization = new AdminOrganizationPage(page);
    await login.navigate();
    await login.verifySuccessfulllogin();
});

test('TC_LV_010: Verify Filter ""My Leave List"" by ""Show Leave with Status""', async () => {
    await leave.clickleaveTab();
    await leave.verifyleavePage();
    await leave.clickLeaveStatusDropdown();
    await leave.clickLeaveStatus("Pending Approval");
    await adminOrganization.clickSearchButton()
});