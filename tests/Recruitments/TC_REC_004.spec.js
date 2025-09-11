import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage.js';
import { RecruitmentPage } from '../../pages/Recruitment.js';
import { AdminOrganizationPage } from '../../pages/AdminOrganization.js';
import { PIMEmployeeListPage } from '../../pages/PIMEmployeeList.js';
import { AdminUserManagementPage } from '../../pages/AdminUserManagement.js';

let login;
let recruitment;
let adminOrganization;
let pimEmployeeList;
let adminUserManagement;

test.beforeEach(async ({ page }) => {
    login = new LoginPage(page);
    recruitment = new RecruitmentPage(page);
    adminOrganization = new AdminOrganizationPage(page);
    pimEmployeeList = new PIMEmployeeListPage(page);
    adminUserManagement = new AdminUserManagementPage(page);
    pimEmployeeList = new PIMEmployeeListPage(page);
    await login.navigate();
    await login.verifySuccessfulllogin();
});

test('TC_REC_004: Add New Vacancy (Positive)', async () => {
    await recruitment.clickRecruitmentTab();
    await recruitment.verifyRecruitmentPage();
    await adminOrganization.clickTopMenu('Vacancies');
    await adminUserManagement.clickAddButton();
    await recruitment.enterVacancyField('Senior Account Assistant');
    await pimEmployeeList.selectDropdown(0);
    await pimEmployeeList.selectDropdownOptionForJob('Account Assistant');
    await recruitment.enterHiringManagerField('John Doe');
    await adminOrganization.clickSaveButton();
});