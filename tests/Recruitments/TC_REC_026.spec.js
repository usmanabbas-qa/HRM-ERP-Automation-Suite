import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage.js';
import { RecruitmentPage } from '../../pages/Recruitment.js';
import { AdminOrganizationPage } from '../../pages/AdminOrganization.js';
import { AdminJob } from '../../pages/AdminJob.js';

let login;
let recruitment;
let adminOrganization;
let adminJob;

test.beforeEach(async ({ page }) => {
    login = new LoginPage(page);
    recruitment = new RecruitmentPage(page);
    adminJob = new AdminJob(page);
    adminOrganization = new AdminOrganizationPage(page);
    await login.navigate();
    await login.verifySuccessfulllogin();
});

test('TC_REC_026: Verify Records Found Count Accuracy (Candidate)', async () => {
    await recruitment.clickRecruitmentTab();
    await recruitment.verifyRecruitmentPage();
    await adminOrganization.clickTopMenu('Candidates');
    await adminJob.verifyRecordsCount();
});