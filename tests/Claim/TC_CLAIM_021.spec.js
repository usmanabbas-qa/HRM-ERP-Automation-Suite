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
let AdminEducation;

test.beforeEach(async ({ page }) => {
    login = new LoginPage(page);
    claim = new ClaimPage(page);
    adminOrganization = new AdminOrganizationPage(page);
    time = new TimePage(page);
    AdminEducation = new AdminEducationPage(page)
    await login.navigate();
    await login.verifySuccessfulllogin();
});

test('TC_CLAIM_021 : Verify Adding a New Expense Type', async () => {
    await claim.clickClaimTab();
    await claim.verifyClaimPage();
    await adminOrganization.clickTopMenu('Configuration ');
    await adminOrganization.selectDropDownItem('Expense Types');
    await claim.verifyPageTitle('Expense Types');
    await claim.clickAddExpense();
    await claim.fillExpenseName('saim');
    await claim.clickSave();


});