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

test('TC_LV_055: Filter ""Holidays"" by Date Range', async () => {
    await leave.clickleaveTab();
    await leave.verifyleavePage();
    await adminOrganization.clickTopMenu('Configure');
    await adminOrganization.selectDropDownItem('Holidays');
    await leave.enterFromDate("01-01-2025");
    await leave.enterToDate("01-05-2025");
    await adminOrganization.clickResetBtn();
});