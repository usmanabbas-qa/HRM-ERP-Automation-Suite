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
    await recruitment.verifyCandidatesPage();
    await recruitment.clickAddButton();
    await recruitment.enterName('Saima');
    await recruitment.enterMiddleName('Bibi');
    await recruitment.enterLastName('Khan');
    await recruitment.enterEmail('saima@gmail.com');
    await recruitment.enterContactNo('03451234567');
    await pimEmployeeList.selectDropdown(0);
    await pimEmployeeList.selectDropdownOptionForJob('Senior QA Lead');
    await adminOrganization.clickSaveButton();
    await adminOrganization.verifySuccessToast();
    await time.clickTopMenu("Candidates");
    await recruitment.filterByHiringManager('Feyza Karatas');
    await recruitment.clickViewButton(0);
    await recruitment.clickReject();
    await adminOrganization.clickSaveButton();
    // console.log(" can not be rejected!!")
});
