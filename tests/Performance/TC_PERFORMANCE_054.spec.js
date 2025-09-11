import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage.js';
import { PerformancePage } from '../../pages/Performance.js';
import { AdminNationalityPage } from '../../pages/AdminNationality.js';


let login;
let performance;
let adminNationality

test.beforeEach(async ({ page }) => {
    login = new LoginPage(page);
    performance = new PerformancePage(page);
    adminNationality = new AdminNationalityPage(page)
    await login.navigate();
    await login.verifySuccessfulllogin();
});


test('TC_PERFORMANCE_054: Verify Checkbox Functionality', async () => {
    await performance.clickperformanceTab();
    await performance.verifyPerformancePage();
    await performance.clickTopMenu('Configure');
    await performance.selectDropDownItem('Trackers');
    await performance.clickSearchButton();
    await adminNationality.clickOnAllNationalityCheckbox();
});