import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage.js';
import { RecruitmentPage } from '../../pages/Recruitment.js';
import { PIMEmployeeListPage } from '../../pages/PIMEmployeeList.js';

let login;
let recruitment;
let pimEmployeeList;

test.beforeEach(async ({ page }) => {
    login = new LoginPage(page);
    recruitment = new RecruitmentPage(page);
    pimEmployeeList = new PIMEmployeeListPage(page);
    await login.navigate();
    await login.verifySuccessfulllogin();
});

test('TC_REC_015:Search Candidate by Candidate Name and Keywords', async () => {
    await recruitment.clickRecruitmentTab();
    await recruitment.verifyRecruitmentPage();
    await recruitment.searchByCandidateName('Mia');
    await recruitment.searchByKeywords('back-end');
    await pimEmployeeList.clickSearchButton();
});