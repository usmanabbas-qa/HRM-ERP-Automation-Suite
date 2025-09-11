import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage.js';
import { ClaimPage } from '../../pages/Claim.js';
import { AdminOrganizationPage } from '../../pages/AdminOrganization.js';
import { callbackify } from 'util';

let login;
let claim;
let adminOrganization;

test.beforeEach(async ({ page }) => {
    login = new LoginPage(page);
    claim = new ClaimPage(page);
    adminOrganization = new AdminOrganizationPage(page);
    await login.navigate();
    await login.verifySuccessfulllogin();
});

test('TC_Claim_001: Verify Required Fields for Employee Claim Submission', async () => {
    await claim.clickClaimTab();
    await claim.verifyClaimPage();
    await adminOrganization.clickTopMenu('Submit Claim');
    await claim.clickCreateButton();
    await claim.eventErrorMessage();
    await claim.CurrencyErrorMessage();
});