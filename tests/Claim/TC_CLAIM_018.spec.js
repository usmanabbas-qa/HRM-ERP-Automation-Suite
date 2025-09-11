import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage.js';
import { ClaimPage } from '../../pages/Claim.js';
import { AdminOrganizationPage } from '../../pages/AdminOrganization.js';
import { TimePage } from '../../pages/Time.js';
import { AdminJob } from '../../pages/AdminJob.js';

let login;
let claim;
let adminOrganization;
let time;
let adminJob;

test.beforeEach(async ({ page }) => {
    login = new LoginPage(page);
    claim = new ClaimPage(page);
    adminJob = new AdminJob(page);
    adminOrganization = new AdminOrganizationPage(page);
    time = new TimePage(page);
    await login.navigate();
    await login.verifySuccessfulllogin();
});

test('TC_Claim_018: Verify Required Fields and Claim Creation', async () => {
    await claim.clickClaimTab();
    await claim.verifyClaimPage();
    await adminOrganization.clickTopMenu('Assign Claim');

    // Verify navigation to the claim creation page
    await adminJob.verifyPageTitle("Create Claim Request");

    // First, check required field validation
    await claim.clickCreateButton();
    await claim.verifyRequiredField();

    // Then, fill details to create a claim (optional additional step)
    await claim.searchAndSelectEmployee('Russel Hamilton');
    await claim.selectEvent('Medical Reimbursement');
    await claim.selectCurrency('United States Dollar');
    await claim.addComment('Test claim description');
    await claim.clickCreateButton();
    await adminOrganization.verifySuccessToast();
});
