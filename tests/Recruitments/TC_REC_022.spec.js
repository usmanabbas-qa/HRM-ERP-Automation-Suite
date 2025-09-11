import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage.js';
import { RecruitmentPage } from '../../pages/Recruitment.js';
import { AdminOrganizationPage } from '../../pages/AdminOrganization.js';
import { AdminConfigurationPage } from '../../pages/AdminConfigurations.js';
import { BuzzPage } from '../../pages/Buzz.js';

let login;
let recruitment;
let adminOrganization;
let adminConfiguration
let buzz;

test.beforeEach(async ({ page }) => {
    login = new LoginPage(page);
    recruitment = new RecruitmentPage(page);
    adminOrganization = new AdminOrganizationPage(page);
    adminConfiguration = new AdminConfigurationPage(page);
    buzz = new BuzzPage(page);
    await login.navigate();
    await login.verifySuccessfulllogin();
});

test('TC_REC_022: Upload Resume for Candidate (Valid File Type)', async () => {
    await recruitment.clickRecruitmentTab();
    await recruitment.verifyRecruitmentPage();
    await adminOrganization.clickTopMenu('Candidates');
    await recruitment.clickViewButton(0);
    await adminOrganization.clickEditToggle();
    await recruitment.verifyClientBrandLogoUpload();
    await adminOrganization.clickSaveButton();
    await adminOrganization.verifySuccessToast();
});