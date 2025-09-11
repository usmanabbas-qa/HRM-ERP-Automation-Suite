import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage.js';
import { PerformancePage } from '../../pages/Performance.js';
import { PIMEmployeeListPage } from '../../pages/PIMEmployeeList.js';

let login;
let performance;
let pimEmployeeList;


test.beforeEach(async ({ page }) => {
    login = new LoginPage(page);
    performance = new PerformancePage(page);
    pimEmployeeList = new PIMEmployeeListPage(page);

    await login.navigate();
    await login.verifySuccessfulllogin();
});

test('TC_PERFORMANCE_061: Verify Employee Reviews Filter Fields', async () => {
    await performance.clickperformanceTab();
    await performance.verifyPerformancePage();
    await performance.clickTopMenu('Manage Reviews');
    await performance.verifyPageHeader('Manage Performance Reviews');
    await performance.verifyManageReviewDropDownItems();
    await performance.selectDropDownItem('Employee Reviews');
    await performance.verifyPageHeader('Employee Performance Reviews');
    await pimEmployeeList.EmployeeNemVisibility();
    await pimEmployeeList.jobTitleVisibility();
    await pimEmployeeList.subUnitVisibility();
});

