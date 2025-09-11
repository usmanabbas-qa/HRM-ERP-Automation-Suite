import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage.js';
import { MaintenancePage } from '../../pages/Maintenance.js';
import { Users } from '../../test-data/logindata.js';
import { LeavePage } from '../../pages/Leave.js';

let login;
let maintenance;
let leave

test.beforeEach(async ({ page }) => {
    login = new LoginPage(page);
    maintenance = new MaintenancePage(page);
    leave = new LeavePage(page);
    await login.navigate();
    await login.verifySuccessfulllogin();
});

test('TC_MAINTAINANCE_022 : Input Validation - Past Employee Field ', async () => {
    await maintenance.clickmaintenanceTab();
    await maintenance.verifyAdmin();
    await login.enterPassword(Users.password);
    await maintenance.clickConfirm();
    await maintenance.verifymaintenancePage();
    await maintenance.selectEmployeeRecords();
    await maintenance.verifyPurgeRecordsVisible();
    await leave.searchEmployee('');
    await leave.clickSearchButton();
    await maintenance.errorMessage();

});