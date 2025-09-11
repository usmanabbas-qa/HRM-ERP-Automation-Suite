import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage.js';
import { RecruitmentPage } from '../../pages/Recruitment.js';
import { AdminOrganizationPage } from '../../pages/AdminOrganization.js';
import { AdminConfigurationPage } from '../../pages/AdminConfigurations.js';

let login;
let recruitment;
let adminOrganization;
let adminConfiguration;

test.beforeEach(async ({ page }) => {
    login = new LoginPage(page);
    recruitment = new RecruitmentPage(page);
    adminOrganization = new AdminOrganizationPage(page);
    adminConfiguration = new AdminConfigurationPage(page);
    await login.navigate();
    await login.verifySuccessfulllogin();
});

test('TC_REC_023: Upload Resume for Candidate (Invalid File Type) (Negative)', async () => {
    await recruitment.clickRecruitmentTab();
    await recruitment.verifyRecruitmentPage();
    await adminOrganization.clickTopMenu('Candidates');
    await recruitment.clickViewButton(0);
    await adminOrganization.clickEditToggle();
    await adminConfiguration.fileUpload();
    await adminOrganization.clickSaveButton();
    await adminConfiguration.uploadFileError();
});