import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage.js';
import { DashboardPage } from '../../pages/Dashboard.js';
import { LeavePage } from '../../pages/Leave.js';
import { TimePage } from '../../pages/Time.js';
import { RecruitmentPage } from '../../pages/Recruitment.js';
import { MyInfoPage } from '../../pages/MyInfo.js';
import { Users } from '../../test-data/logindata.js';
import { AdminUserManagementPage } from '../../pages/AdminUserManagement.js';
import { PerformancePage } from '../../pages/Performance.js';
import { DirectoryPage } from '../../pages/Directory.js';
import { MaintenancePage } from '../../pages/Maintenance.js';
import { ClaimPage } from '../../pages/Claim.js';

let dashboard;
let login;
let performance;
let directory;
let maintenance;
let claim;
let leave;
let time;
let recruitment;
let myInfo;

test.beforeEach(async ({ page }) => {
    dashboard = new DashboardPage(page);
    login = new LoginPage(page);
    leave = new LeavePage(page);
    time = new TimePage(page);
    claim = new ClaimPage(page);
    recruitment = new RecruitmentPage(page);
    myInfo = new MyInfoPage(page);
    performance = new PerformancePage(page);
    directory = new DirectoryPage(page);
    maintenance = new MaintenancePage(page);
    await login.navigate();
    await login.verifySuccessfulllogin();
});

test('TC_DASHBOARD_028: Verify leave widget', async () => {
    await dashboard.verifyWelcomeMessage();
    await dashboard.visibilityOfLeaveWidgetTitle();
});