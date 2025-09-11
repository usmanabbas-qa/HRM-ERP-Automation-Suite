import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage.js';
import { RecruitmentPage } from '../../pages/Recruitment.js';
import { AdminOrganizationPage } from '../../pages/AdminOrganization.js';
import { PIMEmployeeListPage } from '../../pages/PIMEmployeeList.js';

let login;
let recruitment;
let pimEmployeeList;
let adminOrganization;


test.beforeEach(async ({ page }) => {
    login = new LoginPage(page);
    recruitment = new RecruitmentPage(page);
    pimEmployeeList = new PIMEmployeeListPage(page);
    adminOrganization = new AdminOrganizationPage(page);
    await login.navigate();
    await login.verifySuccessfulllogin();
});

test('TC_REC_015:Search Candidate by Candidate Name and Keywords', async () => {
    await recruitment.clickRecruitmentTab();
    await recruitment.verifyRecruitmentPage();
    await recruitment.addCandidate();
    await recruitment.addFirstName('Ayesha');
    await recruitment.addLastName('Imran');
    await recruitment.addEmail('ayeshaimran@example.com');
    await recruitment.addkeyword('back-end');
    await adminOrganization.clickSaveButton()
});