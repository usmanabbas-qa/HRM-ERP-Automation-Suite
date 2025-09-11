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
});

test('TC_PERFORMANCE_006: Search by Review Status', async ()=>{
    await performance.clickperformanceTab();
    await performance.verifyPerformancePage();
    await pimEmployeeList.selectDropdown(3);
    await pimEmployeeList.selectDropdownOption('Completed');
    await adminUserManagement.clickSearchButton();
});