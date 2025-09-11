import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage.js';
import { PerformancePage } from '../../pages/Performance.js';
import { AdminJob } from '../../pages/AdminJob.js';
import { PIMEmployeeListPage } from '../../pages/PIMEmployeeList.js';
import { AdminUserManagementPage } from '../../pages/AdminUserManagement.js';

let login;
let performance;
let adminJob
let pimEmployeeList;
let adminUserManagement;

test.beforeEach(async ({ page }) => {
    login = new LoginPage(page);
    performance = new PerformancePage(page);
    adminJob = new AdminJob(page);
    pimEmployeeList = new PIMEmployeeListPage(page);
    adminUserManagement = new AdminUserManagementPage(page);
    await login.navigate();
    await login.verifySuccessfulllogin();
});

test('TC_PERFORMANCE_010: Verify Results Table Columns', async ()=>{
    await performance.clickperformanceTab();
    await performance.verifyPerformancePage();
    await pimEmployeeList.selectDropdown(0);
    await pimEmployeeList.selectDropdownOption('Software Engineer');
    await pimEmployeeList.selectDropdown(3);
    await pimEmployeeList.selectDropdownOption('Completed');
    await adminUserManagement.clickSearchButton();
    await adminJob.verifyHeader('Employee');
    await adminJob.verifyHeader('Job Title');
    await adminJob.verifyHeader('Sub Unit');
    await adminJob.verifyHeader('Review Period');
    await adminJob.verifyHeader('Due Date');
    await adminJob.verifyHeader('Review Status');
    await adminJob.verifyHeader('Actions');
});
