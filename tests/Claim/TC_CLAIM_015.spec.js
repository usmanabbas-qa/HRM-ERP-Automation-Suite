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

test('TC_Claim_015: Verify Resetting Filters on Employee Claims Page', async () => {
    await claim.clickClaimTab();
    await claim.verifyClaimPage();
    await adminOrganization.clickTopMenu('Employee Claims');
    await time.verifyPageTitle("Employee Claims"); 
    await claim.clickStatusDropDown();
    await claim.selectStatusOption("Initiated");
    await adminOrganization.clickResetBtn();
});