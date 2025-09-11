import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage.js';
import { LeavePage } from '../../pages/Leave.js';
import { AdminOrganizationPage } from '../../pages/AdminOrganization.js';
import { AdminEducationPage } from '../../pages/AdminEducation.js';

let login;
let leave;
let adminOrganization;
let adminEducation;

test.beforeEach(async ({ page }) => {
    login = new LoginPage(page);
    leave = new LeavePage(page);
    adminOrganization = new AdminOrganizationPage(page);
    adminEducation = new AdminEducationPage(page);
    await login.navigate();
    await login.verifySuccessfulllogin();
});

test('TC_LV_054: Delete an existing ""Holiday""', async () => {
    await leave.clickleaveTab();
    await leave.verifyleavePage();
    await adminOrganization.clickTopMenu('Configure');
    await adminOrganization.selectDropDownItem('Holidays');
    await adminEducation.clickDeleteIcon(1);
});