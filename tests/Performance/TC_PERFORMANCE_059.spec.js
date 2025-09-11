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

test('TC_PERFORMANCE_059: Navigate to "My Reviews" from Dropdown', async () => {
    await performance.clickperformanceTab();
    await performance.verifyPerformancePage();
    await performance.clickTopMenu('Manage Reviews');
    await performance.verifyPageHeader('Manage Performance Reviews');
    await performance.verifyManageReviewDropDownItems();
    await performance.selectDropDownItem('My Reviews');
    await performance.verifyPageHeader('My Performance Reviews');
});
