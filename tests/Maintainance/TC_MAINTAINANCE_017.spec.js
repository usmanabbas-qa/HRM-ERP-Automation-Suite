import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage.js';
import { MaintenancePage } from '../../pages/Maintenance.js';
import { Users } from '../../test-data/logindata.js';
import { PerformancePage } from '../../pages/Performance.js';
import { RecruitmentPage } from '../../pages/Recruitment.js';

let login;
let maintenance;
let performance;
let recruitment;

test.beforeEach(async ({ page }) => {
    login = new LoginPage(page);
    maintenance = new MaintenancePage(page);
    performance = new PerformancePage(page);
    recruitment = new RecruitmentPage(page);
    await login.navigate();
    await login.verifySuccessfulllogin();
});

test('TC_MAINTAINANCE_017: Search for Existing Past Employee', async () => {
    await maintenance.clickmaintenanceTab();
    await maintenance.verifyAdmin();
    await login.enterPassword(Users.password);
    await maintenance.clickConfirm();
    await maintenance.verifymaintenancePage();
    await maintenance.selectEmployeeRecords();
    await maintenance.verifyPurgeRecordsVisible();
    await recruitment.searchByCandidateName('R');
    await performance.clickSearchButton();
    await recruitment.invalidError();
});