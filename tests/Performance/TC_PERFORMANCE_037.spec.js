import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage.js';
import { PerformancePage } from '../../pages/Performance.js';
import { AdminEducationPage } from '../../pages/AdminEducation.js';

let login;
let performance;
let adminEducation;

test.beforeEach(async ({ page }) => {
    login = new LoginPage(page);
    performance = new PerformancePage(page);
    adminEducation = new AdminEducationPage(page);
    await login.navigate();
    await login.verifySuccessfulllogin();
});

test('TC_PERFORMANCE_037: Verify "Actions" Column Functionality', async ()=>{
    await performance.clickperformanceTab();
    await performance.verifyPerformancePage();
    await performance.clickTopMenu('Configure');
    await performance.selectDropDownItem('Trackers');
    await adminEducation.clickEditIcon(0);
    await adminEducation.clickSaveButton();
    await adminEducation.verifySuccessToast();
    await adminEducation.clickDeleteIcon(0);
    await adminEducation.confirmDelete()
});
