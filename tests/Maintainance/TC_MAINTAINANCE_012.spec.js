import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage.js';
import { MaintenancePage } from '../../pages/Maintenance.js';
import { Users } from '../../test-data/logindata.js';
import { DashboardPage } from '../../pages/Dashboard.js';


let login;
let maintenance;
let dashboard;

test.beforeEach(async ({ page }) => {
    login = new LoginPage(page);
    dashboard = new DashboardPage(page);
    maintenance = new MaintenancePage(page);
    await login.navigate();
    await login.verifySuccessfulllogin();
});

test('TC_MAINTAINANCE_012: Cancel" Button Functionality ', async () => {
    await maintenance.clickmaintenanceTab();
    await maintenance.verifyAdmin();
    await login.enterPassword(Users.password);
    await maintenance.clickCancel();
    await dashboard.verifyWelcomeMessage();

});