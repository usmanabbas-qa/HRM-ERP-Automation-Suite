import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage.js';
import { RecruitmentPage } from '../../pages/Recruitment.js';
import { AdminOrganizationPage } from '../../pages/AdminOrganization.js';

let login;
let recruitment;
let adminOrganization;

test.beforeEach(async ({ page }) => {
    login = new LoginPage(page);
    recruitment = new RecruitmentPage(page);
    adminOrganization = new AdminOrganizationPage(page);
    await login.navigate();
    await login.verifySuccessfulllogin();
});

test('TC_REC_018: View Candidate Profile (Eye Button Functionality)', async () => {
    await recruitment.clickRecruitmentTab();
    await recruitment.verifyRecruitmentPage();
    await adminOrganization.clickTopMenu('Candidates');
    await recruitment.clickViewButton(0);
});