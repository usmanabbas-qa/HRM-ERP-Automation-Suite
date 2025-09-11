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

test('TC_LV_012: Filter ""My Leave List"" by Date Range', async () => {
    await leave.clickleaveTab();
    await leave.verifyleavePage();
    await leave.enterFromDate("2025-05-01");
    await leave.enterToDate("2025-31-12");
    await adminOrganization.clickSearchButton()
});