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

test('TC_Claim_001: Verify Apply Claim page loads correctly', async () => {
    await claim.clickClaimTab();
    await claim.verifyClaimPage();
});