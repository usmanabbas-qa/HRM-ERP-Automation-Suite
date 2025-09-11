import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage.js';
import { RecruitmentPage } from '../../pages/Recruitment.js';
import { AdminJob } from '../../pages/AdminJob.js';
import { AdminOrganizationPage } from '../../pages/AdminOrganization.js';
import { TimePage } from '../../pages/Time.js';

let login;
let recruitment;
let adminJob;
let adminOrganization;
let time;

test.beforeEach(async ({ page }) => {
    login = new LoginPage(page);
    recruitment = new RecruitmentPage(page);
    adminOrganization = new AdminOrganizationPage(page);
    adminJob = new AdminJob(page);
    time = new TimePage(page);
    await login.navigate();
    await login.verifySuccessfulllogin();

});

test('TC_REC_031: Verify Required Field Indicator', async () => {
    await recruitment.clickRecruitmentTab();
    await recruitment.verifyRecruitmentPage();
    await time.clickTopMenu("Vacancies");
     await adminJob.clickEditIcon(0);
    await recruitment.editJob( 1, 'jdnv');
    await adminOrganization.clickSaveButton();
    await recruitment.alphabetError();
});
