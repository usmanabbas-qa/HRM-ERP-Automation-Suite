import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage.js';
import { ClaimPage } from '../../pages/Claim.js';
import { AdminOrganizationPage } from '../../pages/AdminOrganization.js';
import { TimePage } from '../../pages/Time.js';
import { AdminEducationPage } from '../../pages/AdminEducation.js';

let login;
let claim;
let adminOrganization;
let time;
let adminEducation;

test.beforeEach(async ({ page }) => {
    login = new LoginPage(page);
    claim = new ClaimPage(page);
    adminOrganization = new AdminOrganizationPage(page);
    adminEducation = new AdminEducationPage(page);
    time = new TimePage(page);
    await login.navigate();
    await login.verifySuccessfulllogin();
});

test('TC_CLAIM_022 - Verify Editing an Existing Expense Type', async () => {
    await claim.clickClaimTab();
    await claim.verifyClaimPage();
    await adminOrganization.clickTopMenu('Configuration ');
    await adminOrganization.selectDropDownItem('Expense Types');
    await adminEducation.clickEditIcon(0);
    await adminEducation.clickSaveButton();
});