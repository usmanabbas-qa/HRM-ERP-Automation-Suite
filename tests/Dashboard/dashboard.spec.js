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

test('TC_DASHBOARD_001: Verify Dashboard Welcome Message', async () => {
    await dashboard.verifyWelcomeMessage();
});

test('TC_DASHBOARD_003: "Upgrade" Button Functionality',async()=>{
    await dashboard.verifyUpgradeFunctionality();
});

test('TC_DASHBOARD_004: ""Test User" Dropdown Menu',async()=>{
    await dashboard.verifyUsersDropdownTab();
});

test('TC_DASHBOARD_005: ""Test User" Dropdown - Logout',async()=>{
    await dashboard.verifyUsersDropdownTab();
    await dashboard.verifyLogout();
});

test('TC_DASHBOARD_006: "Help Icon Functionality',async()=>{
    await dashboard.verifyHelpIcon();
});

test('TC_DASHBOARD_008 - "Dashboard" Menu Item Active State', async () => {
    await dashboard.clickMenuItem('Admin');
    await dashboard.verifyMenuItemIsActive('Admin');
});

test('TC_DASHBOARD_007 - Search Field Functionality', async () => {
    await dashboard.clickSearchField();
    await dashboard.typeInSearchField('Dashboard');
    await dashboard.verifySearchInput('Dashboard');
});

test("TC_DASHBOARD_009 - Navigation to Admin Page", async () => {
    await dashboard.clickMenuItem('Admin');
    await dashboard.verifyPageHeading('Admin');
});

test("TC_DASHBOARD_010 - Navigation to PIM Page", async () => {
    await dashboard.clickMenuItem('PIM');
    await dashboard.verifyPageHeading('PIM');
});

test('TC_DASHBOARD_011: Navigation to "Leave" Page', async () =>{
    await leave.clickleaveTab();
    await leave.verifyleavePage();
});

test('TC_DASHBOARD_012: Navigation to "Time" Page', async () =>{
    await time.clickTimeTab();
    await time.verifyTimePage();
});

test('TC_DASHBOARD_013: Navigation to "Recruitment" Page', async () =>{
    await recruitment.clickRecruitmentTab();
    await recruitment.verifyRecruitmentPage();
});

test('TC_DASHBOARD_014: Navigation to "My Info" Page', async () =>{
    await myInfo.clickMyInfoTab();
    await myInfo.verifyMyInfoPage();
});

test('TC_DASHBOARD_015: Navigation to Performance Page',async () =>{
    await performance.clickperformanceTab();
    await performance.verifyPerformancePage();
});

test('TC_DASHBOARD_016: Navigation to "Directory" Page',async () =>{
    await directory.clickdirectoryTab();
    await directory.verifydirectoryPage();
});

test('TC_DASHBOARD_017: Navigation to "Maintenance" Page',async () =>{
    await maintenance.clickmaintenanceTab();
    await maintenance.verifyAdmin();
    await login.enterPassword(Users.password);
    await maintenance.clickConfirm();
    await maintenance.verifymaintenancePage();
});

test('TC_DASHBOARD_018: Navigation to "Claim" Page',async () =>{
    await claim.clickClaimTab();
    await claim.verifyClaimPage();
});

test('TC_DASHBOARD_019: Navigate to "Buzz" Card', async () => {
    await dashboard.navigateToBuzzPage();
});

test('TC_DASHBOARD_020: Navigate to "Assign Leave" Icon ', async () => {
    await dashboard.navigateToAssignLeave();
});

test('TC_DASHBOARD_021: Verify "Leave List" Icon', async () => {
    await dashboard.navigateToLeaveList();
});

test('TC_DASHBOARD_022: Verify "Timesheets" Icon', async () => {
    await dashboard.navigateToTimesheet();
});

test("TC_DASHBOARD_023 : Navigate to Apply Leave Module", async () => {
    await dashboard.navigateToLeave();
    await expect(dashboard.leaveLink).toBeVisible();
    await expect(dashboard.leaveLink).toHaveText('Leave');
    await dashboard.navigateToApplyLeave();
    await expect(dashboard.applyLeave).toBeVisible();
    await expect(dashboard.applyLeave).toHaveText('Apply');
});

test("TC_DASHBOARD_024 : Navigate to My Leave Module", async () => {
    await dashboard.navigateToLeave();
    await expect(dashboard.leaveLink).toBeVisible();
    await expect(dashboard.leaveLink).toHaveText('Leave');
    await dashboard.navigateToMyLeave();
    await expect(dashboard.myLeave).toBeVisible();
    await expect(dashboard.myLeave).toHaveText('My Leave');
});

test("TC_DASHBOARD_025 : Navigate to My TimeSheet Module", async () => {
    await dashboard.navigateToTimeSheet();
    await dashboard.navigateToMyTimeSheet();
});

test("TC_DASHBOARD_026 : Navigate to Buzz Module ", async () => {
    await dashboard.navigateToBuzz();
    await dashboard.navigateToRecentPost();
})

test("TC_DASHBOARD_031 - Settings Icon Functionality", async () => {
    await dashboard.clickWidgetSettingsIcon();
    await dashboard.verifySettingsMenuVisible();
});

test("TC_DASHBOARD_032 - Pie Chart Display", async () => {
    await dashboard.verifyPieChartVisible();
});

test("TC_DASHBOARD_033 -Pending Self Review Link", async () => {
    await dashboard.handlePendingSelfReview();
});

test("TC_DASHBOARD_034 - Candidate to Interview Link", async () => {
    await dashboard.handleCandidateInterviewLink();
});
