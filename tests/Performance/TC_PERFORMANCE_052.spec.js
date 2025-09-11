import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage.js';
import { PerformancePage } from '../../pages/Performance.js';
import { AdminJob } from '../../pages/AdminJob.js';


let login;
let performance;
let adminJob;

test.beforeEach(async ({ page }) => {
    login = new LoginPage(page);
    performance = new PerformancePage(page);
    adminJob = new AdminJob(page);
    await login.navigate();
    await login.verifySuccessfulllogin();
});

test('TC_PERFORMANCE_052: Verify "Record Found" Count Display', async () => {
    await performance.clickperformanceTab();
    await performance.verifyPerformancePage();
    await performance.clickTopMenu('Configure');
    await performance.selectDropDownItem('Trackers');
    await performance.enterEmployeeName('John Doe');
    await performance.clickSearchButton();
    await adminJob.verifyRecordsCount();
})