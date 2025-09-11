import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage.js';
import { ClaimPage } from '../../pages/Claim.js';

let login;
let claim;

test.beforeEach(async ({ page }) => {
    login = new LoginPage(page);
    claim = new ClaimPage(page);
    await login.navigate();
    await login.verifySuccessfulllogin();
});

test('TC_Claim_002: Verify Successful Submission of a New Claim by Employee', async () => {
    await claim.clickClaimTab();
    await claim.verifyClaimPage();
    await claim.clickAssignClaim();
    await claim.searchAndSelectHint('saima');
    await claim.selectMedicalReimbursement();
    await claim.selectCurrency();
    await claim.addComment('new clain');
    await claim.clickCreateButton();
    await claim.verifyInvalidMessageVisible();
});