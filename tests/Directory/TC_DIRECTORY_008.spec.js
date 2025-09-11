import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage.js';
import { DirectoryPage } from '../../pages/Directory.js';
import { ClaimPage } from '../../pages/Claim.js';
import { AdminOrganizationPage } from '../../pages/AdminOrganization.js';

let login;
let directory;
let claim;
let adminOrganization;

test.beforeEach(async ({ page }) => {
    login = new LoginPage(page);
    directory = new DirectoryPage(page);
    claim = new ClaimPage(page);
    adminOrganization = new AdminOrganizationPage(page);
    await login.navigate();
    await login.verifySuccessfulllogin();
});

test('TC_Directory_008: Test Reset Button', async () => {
    await directory.clickdirectoryTab();
    await directory.verifydirectoryPage();
    await claim.enterEmployeeName("rahul das");
    await directory.selectJobTitle("QA Engineer");
    await directory.selectLocation("Canadian Regional HQ");
    await adminOrganization.clickResetBtn();
});