import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage.js';
import { RecruitmentPage } from '../../pages/Recruitment.js';
import { AdminJob } from '../../pages/AdminJob.js';
import { AdminOrganizationPage } from '../../pages/AdminOrganization.js';
import { TimePage } from '../../pages/Time.js';
import { PIMEmployeeListPage } from '../../pages/PIMEmployeeList.js';

let login;
let recruitment;
let adminJob;
let adminOrganization;
let time;
let pimEmployeeList;

test.beforeEach(async ({ page }) => {
    login = new LoginPage(page);
    recruitment = new RecruitmentPage(page);
    adminOrganization = new AdminOrganizationPage(page);
    adminJob = new AdminJob(page);
    pimEmployeeList = new PIMEmployeeListPage(page);
    time = new TimePage(page);
    await login.navigate();
    await login.verifySuccessfulllogin();

});

test('TC_REC_020: Reject Candidate from Profile Page', async () => {
    await recruitment.clickRecruitmentTab();
    await recruitment.verifyRecruitmentPage();
    await time.clickTopMenu("Candidates");
    await pimEmployeeList.selectDropdown(2);
    await pimEmployeeList.selectDropdownOptionForJob('Feyza Karatas');
    await adminOrganization.clickSearchButton();
    await recruitment.clickViewButton(0);
    await recruitment.clickReject();
    await adminOrganization.clickSaveButton();
    await adminOrganization.verifySuccessToast();
});
