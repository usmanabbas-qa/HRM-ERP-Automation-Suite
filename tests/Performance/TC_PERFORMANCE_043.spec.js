import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage.js';
import { PerformancePage } from '../../pages/Performance.js';
import { AdminJob } from '../../pages/AdminJob.js';
import { AdminUserManagementPage } from '../../pages/AdminUserManagement.js';
import { PIMEmployeeListPage } from '../../pages/PIMEmployeeList.js';
import { AdminOrganizationPage } from '../../pages/AdminOrganization.js';
import { AdminEducationPage } from '../../pages/AdminEducation.js';
import { AdminNationalityPage } from '../../pages/AdminNationality.js';

let login;
let performance;
let adminJob;
let adminUserManagement;
let pimEmployeeList;
let adminOrganization;
let adminEducation;
let adminNationality;

test.beforeEach(async ({ page }) => {
    login = new LoginPage(page);
    performance = new PerformancePage(page);
    adminJob = new AdminJob(page);
    adminUserManagement = new AdminUserManagementPage(page);
    pimEmployeeList = new PIMEmployeeListPage(page);
    adminOrganization = new AdminOrganizationPage(page);
    adminEducation = new AdminEducationPage(page);
    adminNationality = new AdminNationalityPage(page);

    await login.navigate();
    await login.verifySuccessfulllogin();
});

test('TC_PERFORMANCE_043 - Verify Left Navigation Menu', async({page})=>{
    await performance.clickperformanceTab();
    await performance.verifyPerformancePage();
    await performance.clickTopMenu('Employee Trackers');
    await performance.visiblityOfLeftNavigation();
});