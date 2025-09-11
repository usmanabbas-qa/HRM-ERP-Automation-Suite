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

test('TC_Claim_016: Verify Navigation to Assign Claim Page', async () => {
    await claim.clickClaimTab();
    await claim.verifyClaimPage();
    await adminOrganization.clickTopMenu('Assign Claim');
    await adminJob.verifyPageTitle("Create Claim Request");
});