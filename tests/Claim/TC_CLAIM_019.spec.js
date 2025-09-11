import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage.js';
import { ClaimPage } from '../../pages/Claim.js';
import { AdminOrganizationPage } from '../../pages/AdminOrganization.js';
import { TimePage } from '../../pages/Time.js';

let login;
let claim;
let adminOrganization;
let time;

test.beforeEach(async ({ page }) => {
    login = new LoginPage(page);
    claim = new ClaimPage(page);
    adminOrganization = new AdminOrganizationPage(page);
    time = new TimePage(page);
    await login.navigate();
    await login.verifySuccessfulllogin();
});

test('TC_CLAIM_019 : Verify Cancel Button on Claim Assignment', async () => {
    await claim.clickClaimTab();
    await claim.verifyClaimPage();
    await adminOrganization.clickTopMenu('Assign Claim');
    await claim.searchAndSelectEmployee('Russel Hamilton');
    await claim.selectEvent('Medical Reimbursement');
    await claim.selectCurrency('United States Dollar');
    await claim.addComment('Test claim description');
    await claim.clickCancel();
    await claim.verifyClaimPage()
});