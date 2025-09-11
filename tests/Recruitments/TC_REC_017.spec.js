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
    await login.navigate();
    await login.verifySuccessfulllogin();
});

test('TC_REC_017: Add Candidate with Missing Required Field (Negative)', async () => {
    await recruitment.clickRecruitmentTab();
    await recruitment.verifyRecruitmentPage();
    await adminOrganization.clickTopMenu('Candidates');
    await adminUserManagement.clickAddButton();
    await pimEmployeeList.selectDropdown(0);
    await pimEmployeeList.selectDropdownOptionForJob('Senior QA Lead');
    await recruitment.enterEmailField('john.doe@example.com');
    await adminOrganization.clickSaveButton();
    await recruitment.verifyRequiredFieldErrorByIndex('0', 'First Name');
    await recruitment.verifyRequiredFieldErrorByIndex('1', 'Last Name');

});