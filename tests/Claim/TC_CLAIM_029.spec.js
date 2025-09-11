import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage.js';
import { ClaimPage } from '../../pages/Claim.js';
import { AdminOrganizationPage } from '../../pages/AdminOrganization.js';
import { TimePage } from '../../pages/Time.js';
import { AdminEducationPage } from '../../pages/AdminEducation.js';
import { AdminUserManagementPage } from '../../pages/AdminUserManagement.js';

let login;
let claim;
let adminOrganization;
let time;
let adminEducation;
let adminUserManagement;

test.beforeEach(async ({ page }) => {
    login = new LoginPage(page);
    claim = new ClaimPage(page);
    adminOrganization = new AdminOrganizationPage(page);
    time = new TimePage(page);
    adminEducation = new AdminEducationPage(page);
    adminUserManagement = new AdminUserManagementPage(page);
    await login.navigate();
    await login.verifySuccessfulllogin();
});

test('TC_CLAIM_029 - Verify Filtering Events by Event Name', async () => {
    await claim.clickClaimTab();
    await claim.verifyClaimPage();
    await adminOrganization.clickTopMenu('Configuration ');
    await adminOrganization.selectDropDownItem('Events');
    await claim.searchByName('Accommodations');
    await adminUserManagement.clickSearchButton();
});
