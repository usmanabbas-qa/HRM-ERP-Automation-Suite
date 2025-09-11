import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage.js';
import { PIMEmployeeListPage } from '../../pages/PIMEmployeeList.js';
import { AdminOrganizationPage } from '../../pages/AdminOrganization.js';
import { PIMAddEmplyeePage } from '../../pages/PIMAddEmployee.js';
import { AdminConfigurationPage } from '../../pages/AdminConfigurations.js';
import { PIMReportsPage } from '../../pages/PIMReports.js';

let login;
let pimEmployeeList;
let adminOrganization;
let pimAddEmplyee;
let adminConfiguration;
let pimReports;

test.beforeEach(async ({ page }) => {
    login = new LoginPage(page);
    adminOrganization = new AdminOrganizationPage(page);
    adminConfiguration = new AdminConfigurationPage(page);
    pimEmployeeList = new PIMEmployeeListPage(page);
    pimAddEmplyee = new PIMAddEmplyeePage(page);
    pimReports = new PIMReportsPage(page);
    await login.navigate();
    await login.verifySuccessfulllogin();
});

test('TC_PIM_REP_001: Verify Navigation to "Reports" Tab', async () => {
    await pimEmployeeList.clickPIMTab();
    await adminOrganization.clickTopMenu('Reports');
    await adminConfiguration.verifySectionHeading('Employee Reports');
});

test('TC_PIM_REP_002: Verify Default State of Reports Page', async () => {
    await pimEmployeeList.clickPIMTab();
    await adminOrganization.clickTopMenu('Reports');
    await adminConfiguration.verifySectionHeading('Employee Reports');
});

test('TC_PIM_REP_003: Search for an Existing Report by Full Name', async () => {
    await pimEmployeeList.clickPIMTab();
    await adminOrganization.clickTopMenu('Reports');
    await adminConfiguration.verifySectionHeading('Employee Reports');
    await pimReports.search('PIM Sample Report');
    await pimReports.clickOnopt();
    await pimEmployeeList.clickSearchButton();
});

test('TC_PIM_REP_004: Search for an Existing Report by Partial Name', async () => {
    await pimEmployeeList.clickPIMTab();
    await adminOrganization.clickTopMenu('Reports');
    await adminConfiguration.verifySectionHeading('Employee Reports');
    await pimReports.search('Sample');
    await pimReports.clickOnopt();
    await pimEmployeeList.clickSearchButton();
});

test('TC_PIM_REP_005: Search for a Non-Existent Report', async () => {
    await pimEmployeeList.clickPIMTab();
    await adminOrganization.clickTopMenu('Reports');
    await adminConfiguration.verifySectionHeading('Employee Reports');
    await pimReports.search('Non existant');
    await pimEmployeeList.clickSearchButton();
    await pimReports.verifyErrorMessage();
});

test('TC_PIM_REP_006: Use "Reset" Button to Clear Search', async () => {
    await pimEmployeeList.clickPIMTab();
    await adminOrganization.clickTopMenu('Reports');
    await adminConfiguration.verifySectionHeading('Employee Reports');
    await pimReports.search('Non existant');
    await adminOrganization.clickResetBtn()
});

test('TC_PIM_REP_007: Add a New Report (High-Level)', async()=>{
    await pimEmployeeList.clickPIMTab();
    await pimReports.clickOnReports();
    await pimReports.clickOnAddBtn();
    await pimReports.enterReportName('Test Report')
    await pimEmployeeList.selectDropdown(3);
    await pimEmployeeList.selectDropdownOption('Job');
    await adminOrganization.clickSaveButton()
});

test('TC_PIM_REP_008: Edit an Existing Report', async()=>{
    await pimEmployeeList.clickPIMTab();
    await pimReports.clickOnReports();
    await adminOrganization.clickEditIconByIndex(1)
    await pimReports.enterReportName('Test Report Edit ')
    await pimEmployeeList.selectDropdown(3);
    await pimEmployeeList.selectDropdownOption('Job');
    await adminOrganization.clickSaveButton()
});

test('TC_PIM_REP_009: Delete an Existing Report', async()=>{
    await pimEmployeeList.clickPIMTab();
    await pimReports.clickOnReports();
    await adminConfiguration.deleteButtonByIndex(1)
});

test('TC_PIM_EL_010:  Sort Employee List by Last Name (Ascending/Descending)', async () => {
    await pimEmployeeList.clickPIMTab();
    await pimReports.clickOnReports();
    await pimReports.clickNameDropDown(); 
    await pimReports.sortReportsByName('Ascending');
});