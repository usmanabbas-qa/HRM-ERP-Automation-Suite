import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage.js';
import { PerformancePage } from '../../pages/Performance.js';
import { AdminUserManagementPage } from '../../pages/AdminUserManagement.js';


let login;
let performance;
let adminUserManagement;

test.beforeEach(async ({ page }) => {
    login = new LoginPage(page);
    performance = new PerformancePage(page);
    adminUserManagement = new AdminUserManagementPage(page);
    await login.navigate();
    await login.verifySuccessfulllogin();
});

test('TC_PERFORMANCE_007: To verify searching for reviews within a valid date range.', async ()=>{
    await performance.clickperformanceTab();
    await performance.verifyPerformancePage();
    await performance.selectCalender(0);
    await performance.selectDate(3);
    await adminUserManagement.clickSearchButton();
});
