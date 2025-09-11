import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage.js';
import { RecruitmentPage } from '../../pages/Recruitment.js';
import { AdminOrganizationPage } from '../../pages/AdminOrganization.js';
import { PIMEmployeeListPage } from '../../pages/PIMEmployeeList.js';

let login;
let recruitment;
let adminOrganization;
let pimEmployeeList;

test.beforeEach(async ({ page }) => {
    login = new LoginPage(page);
    recruitment = new RecruitmentPage(page);
    adminOrganization = new AdminOrganizationPage(page);
    pimEmployeeList = new PIMEmployeeListPage(page);
    await login.navigate();
    await login.verifySuccessfulllogin();
});

test('TC_REC_002: Search Vacancy by Job Title (Positive)', async () => {
    await recruitment.clickRecruitmentTab();
    await recruitment.verifyRecruitmentPage();
    await adminOrganization.clickTopMenu('Vacancies');
    await pimEmployeeList.selectDropdown(0);
    await pimEmployeeList.selectDropdownOptionForJob('Account Assistant');
    await adminOrganization.clickSearchButton();
});