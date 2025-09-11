import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage.js';
import { PerformancePage } from '../../pages/Performance.js';
import { AdminUserManagementPage } from '../../pages/AdminUserManagement.js';
import { PIMEmployeeListPage } from '../../pages/PIMEmployeeList.js';


let login;
let performance;
let adminUserManagement;
let pimEmployeeList;

test.beforeEach(async ({ page }) => {
    login = new LoginPage(page);
    performance = new PerformancePage(page);
    adminUserManagement = new AdminUserManagementPage(page);
    pimEmployeeList = new PIMEmployeeListPage(page);

    await login.navigate();
    await login.verifySuccessfulllogin();
    await performance.clickperformanceTab();
    await performance.verifyPerformancePage();

});

test('TC_PERFORMANCE_034 - Click Add Button', async () => {
    await performance.clickTopMenu('Configure');
    await performance.selectDropDownItem('Trackers');
    await performance.clickAddButton();
    await performance.verifyPageHeader('Add Performance Tracker');
});