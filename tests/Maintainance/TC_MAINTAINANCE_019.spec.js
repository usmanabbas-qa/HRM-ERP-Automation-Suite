import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage.js';
import { AdminOrganizationPage } from '../../pages/AdminOrganization.js';
import { MaintenancePage } from '../../pages/Maintenance.js';
import { Users } from '../../test-data/logindata.js';

let login;
let adminOrganization;
let maintenance;

test.beforeEach(async ({ page }) => {
    login = new LoginPage(page);
    adminOrganization = new AdminOrganizationPage(page);
    maintenance = new MaintenancePage(page);
    await login.navigate();
    await login.verifySuccessfulllogin();
});

test('TC_MAINTAINANCE_019:Purge Single Selected Employee Record ', async () => {
    await maintenance.clickmaintenanceTab();
    await maintenance.verifyAdmin();
    await login.enterPassword(Users.password);
    await maintenance.clickConfirm();
    await adminOrganization.clickTopMenu('Purge Records');
    await adminOrganization.selectDropDownItem('Candidate Records');
    await maintenance.searchRecord('Payroll Administrator');
    await adminOrganization.clickSearchButton();
    await maintenance.purgeAll();
    console.log('We cannot Purge the single record');
});