import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage.js';
import { PerformancePage } from '../../pages/Performance.js';

let login;
let performance;

test.beforeEach(async ({ page }) => {
    login = new LoginPage(page);
    performance = new PerformancePage(page);

    await login.navigate();
    await login.verifySuccessfulllogin();
});

test('TC_PERFORMANCE_056: Navigate to "Manage Reviews" Tab', async () => {
    await performance.clickperformanceTab();
    await performance.verifyPerformancePage();
    await performance.clickTopMenu('Manage Reviews');
    await performance.selectDropDownItem('Manage Reviews');
    await performance.verifyPageHeader('Manage Performance Reviews');
});