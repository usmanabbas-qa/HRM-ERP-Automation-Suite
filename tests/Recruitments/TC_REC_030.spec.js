import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage.js';
import { RecruitmentPage } from '../../pages/Recruitment.js';
import { AdminOrganizationPage } from '../../pages/AdminOrganization.js';
import { AdminConfigurationPage } from '../../pages/AdminConfigurations.js';
import { BuzzPage } from '../../pages/Buzz.js';
import { AdminJob } from '../../pages/AdminJob.js';

let login;
let recruitment;
let adminOrganization;
let adminConfiguration
let adminJob;
let buzz;

test.beforeEach(async ({ page }) => {
    login = new LoginPage(page);
    recruitment = new RecruitmentPage(page);
    adminOrganization = new AdminOrganizationPage(page);
    adminConfiguration = new AdminConfigurationPage(page);
    adminJob = new AdminJob(page);
    buzz = new BuzzPage(page);
    await login.navigate();
    await login.verifySuccessfulllogin();
});

test('TC_REC_030: REC-GEN-006: Verify External Link Functionality (RSS Feed/Web Page)', async () => {
    await recruitment.clickRecruitmentTab();
    await recruitment.verifyRecruitmentPage();
    await adminOrganization.clickTopMenu('vacancies');
    await adminJob.clickEditIcon(0);
    await recruitment.verifyRSSLink();
});