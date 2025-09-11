import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage.js';
import { RecruitmentPage } from '../../pages/Recruitment.js';
import { AdminOrganizationPage } from '../../pages/AdminOrganization.js';
import { AdminJob } from '../../pages/AdminJob.js';
import { PerformancePage } from '../../pages/Performance.js';

let login;
let recruitment;
let adminOrganization;
let adminJob;
let performance;

test.beforeEach(async ({ page }) => {
    login = new LoginPage(page);
    recruitment = new RecruitmentPage(page);
    adminJob = new AdminJob(page);
    performance = 
    adminOrganization = new AdminOrganizationPage(page);
    await login.navigate();
    await login.verifySuccessfulllogin();
});

test('TC_REC_028: Reset Search Filters (Candidates)', async () => {
    await recruitment.clickRecruitmentTab();
    await recruitment.verifyRecruitmentPage();
    await adminOrganization.clickTopMenu('Candidates');
    await recruitment.clickResetButton();
});