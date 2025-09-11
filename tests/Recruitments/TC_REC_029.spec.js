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

test('TC_REC_029: Verify User Interface Consistency for Delete Pop-up', async () => {
    await recruitment.clickRecruitmentTab();
    await recruitment.verifyRecruitmentPage();
    await adminOrganization.clickTopMenu('Candidates');
    await adminConfiguration.deleteButtonByIndex(0);
});