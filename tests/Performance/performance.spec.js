import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage.js';
import { PerformancePage } from '../../pages/Performance.js';
import { AdminJob } from '../../pages/AdminJob.js';
import { AdminUserManagementPage } from '../../pages/AdminUserManagement.js';
import { PIMEmployeeListPage } from '../../pages/PIMEmployeeList.js';
import { AdminOrganizationPage } from '../../pages/AdminOrganization.js';
import { AdminEducationPage } from '../../pages/AdminEducation.js';
import { AdminNationalityPage } from '../../pages/AdminNationality.js';

let login;
let performance;
let adminJob;
let adminUserManagement;
let pimEmployeeList;
let adminOrganization;
let adminEducation;
let adminNationality;

test.beforeEach(async ({ page }) => {
    login = new LoginPage(page);
    performance = new PerformancePage(page);
    adminJob = new AdminJob(page);
    adminUserManagement = new AdminUserManagementPage(page);
    pimEmployeeList = new PIMEmployeeListPage(page);
    adminOrganization = new AdminOrganizationPage(page);
    adminEducation = new AdminEducationPage(page);
    adminNationality = new AdminNationalityPage(page);

    await login.navigate();
    await login.verifySuccessfulllogin();
});

test('TC_PERFORMANCE_001: Verify Page Title and Header Elements', async () => {
    await performance.clickperformanceTab();
    await performance.verifyPerformancePage();
});

test('TC_PERFORMANCE_002: Verify Main Content Area Tabs and Sub-tabs', async () => {
    await performance.clickperformanceTab();
    await performance.verifyPerformancePage();
});

test('TC_PERFORMANCE_003: Search with Default Filters (No Records Found)', async () => {
    await performance.clickperformanceTab();
    await performance.verifyPerformancePage();
    await adminUserManagement.clickSearchButton();
    await adminJob.verifyRecordsCount();
});

test('TC_PERFORMANCE_004: Search by Employee Name', async () => {
    await performance.clickperformanceTab();
    await performance.verifyPerformancePage();
    await pimEmployeeList.enterEmployeeName('John Doe');
    await adminUserManagement.clickSearchButton();
});

test('TC_PERFORMANCE_005: Search by Job Title', async () => {
    await performance.clickperformanceTab();
    await performance.verifyPerformancePage();
    await pimEmployeeList.selectDropdown(0);
    await pimEmployeeList.selectDropdownOption('Software Engineer');
    await adminUserManagement.clickSearchButton();
});

test('TC_PERFORMANCE_013 - Navigate to "KPIs" Sub-tab', async () => {
    await performance.clickperformanceTab();
    await performance.verifyPerformancePage();
    await performance.clickTopMenu('Configure');
    await performance.selectDropDownItem('KPIs');
});

test('TC_PERFORMANCE_014 - Verify Page Title and Header Elements', async () => {
    await performance.clickperformanceTab();
    await performance.verifyPerformancePage();
    await performance.clickTopMenu('Configure');
    await performance.selectDropDownItem('KPIs');
    await performance.verifyPageHeader('Key Performance Indicators');
});

test('TC_PERFORMANCE_015 - Verify Main Content Area Tabs', async () => {
    await performance.clickperformanceTab();
    await performance.verifyPerformancePage();
    await performance.clickTopMenu('Configure');
    await performance.selectDropDownItem('KPIs');
    await performance.verifyContentTabs();
});

test('TC_PERFORMANCE_016 - Verify Section Title and Add Button', async () => {
    await performance.clickperformanceTab();
    await performance.verifyPerformancePage();
    await performance.clickTopMenu('Configure');
    await performance.selectDropDownItem('KPIs');
    await performance.verifyContentTabs();
    await performance.verifyPageHeader('Key Performance Indicators');
});

test('TC_PERFORMANCE_017 - Search with Default Filters (No Job Title Selected)', async () => {
    await performance.clickperformanceTab();
    await performance.verifyPerformancePage();
    await performance.clickTopMenu('Configure');
    await performance.selectDropDownItem('KPIs');
    await performance.clickSearchButton();
});

test('TC_PERFORMANCE_018 - Reset Button Functionality', async () => {
    await performance.clickperformanceTab();
    await performance.verifyPerformancePage();
    await performance.clickTopMenu('Configure');
    await performance.selectDropDownItem('KPIs');
    await performance.clickJobDropDown('Account Assistant');
    await performance.clickResetButton();
});

test('TC_PERFORMANCE_020: Search by Job Title (No Matching Records)', async () => {
    await performance.clickperformanceTab();
    await performance.verifyPerformancePage();
    await performance.clickTopMenu('Configure');
    await performance.selectDropDownItem('KPIs');
    await performance.clickJobDropDown('VP - Client Services');
    await performance.clickSearchButton();
    await performance.verifyNoRecordsFound();
});

test('TC_PERFORMANCE_021: Click Add Button', async () => {
    await performance.clickperformanceTab();
    await performance.verifyPerformancePage();
    await performance.clickTopMenu('Configure');
    await performance.selectDropDownItem('KPIs');
    await performance.clickAddButton();
    await performance.assertKPIPage();
});

test('TC_PERFORMANCE_022: Verify Results Table Columns', async () => {
    await performance.clickperformanceTab();
    await performance.verifyPerformancePage();
    await performance.clickTopMenu('Configure');
    await performance.selectDropDownItem('KPIs');
    await performance.clickJobDropDown('VP - Client Services');
    await performance.clickSearchButton();
    await performance.assertJobTitle();
});

test('TC_PERFORMANCE_023: Verify "Records Found" Count Display', async () => {
    await performance.clickperformanceTab();
    await performance.verifyPerformancePage();
    await performance.clickTopMenu('Configure');
    await performance.selectDropDownItem('KPIs');
    await performance.clickSearchButton();
    await adminJob.verifyRecordsCount();
});

test('TC_PERFORMANCE_024: Verify "Actions" Column Functionality (Edit/Delete)', async () => {
    await performance.clickperformanceTab();
    await performance.verifyPerformancePage();
    await performance.clickTopMenu('Configure');
    await performance.selectDropDownItem('KPIs');
    await adminNationality.clickDeleteIcon(0);
    console.log('Delete action performed successfully');
    console.log('Edit action on job title is not available in the website');
});

test('TC_PERFORMANCE_025: Verify Checkbox Functionality', async () => {
    await performance.clickperformanceTab();
    await performance.verifyPerformancePage();
    await performance.clickTopMenu('Configure');
    await performance.selectDropDownItem('KPIs');
    await performance.clickSearchButton();
    await adminNationality.clickOnAllNationalityCheckbox();
});

test('TC_PERFORMANCE_026: Navigate to "Manage Reviews" Tab', async () => {
    await performance.clickperformanceTab();
    await performance.verifyPerformancePage();
    await performance.clickTopMenu('Manage Reviews');
    await performance.selectDropDownItem('Manage Reviews');
    await performance.verifyPageHeader('Manage Performance Reviews');
});

test('TC_PERFORMANCE_027: Verify Left Navigation Menu', async () => {
    await performance.verifyLeftNavigationMenu();
    await performance.clickperformanceTab();
    await performance.verifyPerformancePage();
});

test('TC_PERFORMANCE_028: Verify Main Content Area Tabs', async () => {
    await performance.clickperformanceTab();
    await performance.verifyPerformancePage();
    await performance.verifyMainContentTabs();
});

test('TC_PERFORMANCE_029: Verify Section Title and Add Button', async () => {
    await performance.clickperformanceTab();
    await performance.verifyPerformancePage();
    await performance.clickTopMenu('My Tracker');
    await performance.verifyAddButton();
});

test('TC_PERFORMANCE_030: Verify View Button', async () => {
    await performance.clickperformanceTab();
    await performance.verifyPerformancePage();
    await performance.clickTopMenu('My Tracker');
    await performance.verifyViewButton();
});

test('TC_PERFORMANCE_031:  Verify Record Found ', async () => {
    await performance.clickperformanceTab();
    await performance.verifyPerformancePage();
    await performance.clickTopMenu('My Tracker');
    await adminJob.verifyRecordsCount();
});

test('TC_PERFORMANCE_019: Search by Job Title (Valid Selection)', async () => {
    await performance.clickperformanceTab();
    await performance.verifyPerformancePage();
    await performance.clickTopMenu('Configure');
    await performance.selectDropDownItem('KPIs');
    await performance.clickJobDropDown('HR Manager');
    await performance.clickSearchButton();
    await adminJob.verifyRecordsCount();
});
