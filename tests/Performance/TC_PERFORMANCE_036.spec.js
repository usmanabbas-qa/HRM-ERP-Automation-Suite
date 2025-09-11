







import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage.js';
import { PerformancePage } from '../../pages/Performance.js';
import { AdminUserManagementPage } from '../../pages/AdminUserManagement.js';
import { PIMEmployeeListPage } from '../../pages/PIMEmployeeList.js';
import { AdminJob } from '../../pages/AdminJob.js';


let login;
let performance;
let adminUserManagement;
let pimEmployeeList;
let adminJob;

test.beforeEach(async ({ page }) => {
    login = new LoginPage(page);
    performance = new PerformancePage(page);
    adminJob = new AdminJob(page);
    adminUserManagement = new AdminUserManagementPage(page);
    pimEmployeeList = new PIMEmployeeListPage(page);

    await login.navigate();
    await login.verifySuccessfulllogin();
    await performance.clickperformanceTab();
    await performance.verifyPerformancePage();

});

test('TC_PERFORMANCE_036 - Verify "Record Found" Count Display', async () => {
    await performance.clickTopMenu('Configure');
    await performance.selectDropDownItem('Trackers');
    await adminJob.verifyRecordsCount();
});


