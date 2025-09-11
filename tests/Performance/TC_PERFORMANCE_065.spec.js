import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage.js';
import { PerformancePage } from '../../pages/Performance.js';
import { AdminOrganizationPage } from '../../pages/AdminOrganization.js'


let login;
let performance;
let adminOrganization;


test.beforeEach(async ({ page }) => {
    login = new LoginPage(page);
    performance = new PerformancePage(page);
    adminOrganization = new AdminOrganizationPage(page);
    await login.navigate();
    await login.verifySuccessfulllogin();
});

test('TC_PERFORMANCE_065 - Verify My Performance Trackers Actions Column Functionality', async ({ page }) => {
    await performance.clickperformanceTab();
    await performance.verifyPerformancePage();
    await adminOrganization.clickTopMenu('My Trackers');
    await performance.verifyViewButton();
});

