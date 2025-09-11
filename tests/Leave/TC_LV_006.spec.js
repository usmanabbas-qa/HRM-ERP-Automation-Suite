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

test('TC_LV_006: Apply Leave with past dates', async () => {
    await leave.clickleaveTab();
    await leave.verifyleavePage();
    await adminOrganization.clickTopMenu("Assign Leave");
    console.log("Assign Leave page is empty. Implementation cannot proceed.");
});