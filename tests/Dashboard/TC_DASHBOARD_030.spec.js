import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage.js';
import { DashboardPage } from '../../pages/Dashboard.js';

let dashboard;
let login;

test.beforeEach(async ({ page }) => {
    dashboard = new DashboardPage(page);
    login = new LoginPage(page);
    await login.navigate();
    await login.verifySuccessfulllogin();
});

test('TC_DASHBOARD_030: No Data Display (if no employees are on leave)',async()=>{
    await dashboard.verifyEmployeeLeave();
});