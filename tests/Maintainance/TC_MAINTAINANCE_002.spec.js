import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage.js';
import { MaintenancePage } from '../../pages/Maintenance.js';
import { Users } from '../../test-data/logindata.js';

let login;
let maintenance;

test.beforeEach(async ({ page }) => {
    login = new LoginPage(page);
    maintenance = new MaintenancePage(page);
    await login.navigate();
    await login.verifySuccessfulllogin();
});

test('TC_MAINTAINANCE_002 - Top Navigation Bar Consistency ', async () => {
    await maintenance.clickmaintenanceTab();
    await maintenance.verifyAdmin();
    await login.enterPassword(Users.password);
    await maintenance.clickConfirm();
    await maintenance.verifymaintenancePage();
    await maintenance.verifyTabs();
});