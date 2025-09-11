import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage.js';
import { PIMEmployeeListPage } from '../../pages/PIMEmployeeList.js';
import { AdminOrganizationPage } from '../../pages/AdminOrganization.js';
import { PIMAddEmplyeePage } from '../../pages/PIMAddEmployee.js';
import { AdminConfigurationPage } from '../../pages/AdminConfigurations.js';

let login;
let pimEmployeeList;
let adminOrganization;
let pimAddEmplyee;
let adminConfiguration;

test.beforeEach(async ({ page }) => {
    login = new LoginPage(page);
    pimEmployeeList = new PIMEmployeeListPage(page);
    adminOrganization = new AdminOrganizationPage(page);
    pimAddEmplyee = new PIMAddEmplyeePage(page);
    adminConfiguration = new AdminConfigurationPage(page);
    await login.navigate();
    await login.verifySuccessfulllogin();
});

test('TC_PIM_EL_001:  Verify Navigation to PIM Module - Employee List', async () => {
    await pimEmployeeList.clickPIMTab();
    await pimEmployeeList.verifyPIM();
});


test('TC_PIM_EL_002: Verify Default State of Employee List Page', async () => {
    await pimEmployeeList.clickPIMTab();
    await pimEmployeeList.verifyPIM();
    await pimEmployeeList.EmployeeNemVisibility();
    await pimEmployeeList.EmployeeIdVisibility();
    await pimEmployeeList.EmployeeStatusVisibility();
    await pimEmployeeList.jobTitleVisibility();
    await pimEmployeeList.subUnitVisibility();
});

test('TC_PIM_EL_003: Search for an Employee by Valid Employee Name (Partial)', async () => {
    await pimEmployeeList.clickPIMTab();
    await pimEmployeeList.verifyPIM();
    await pimEmployeeList.searchEmployeeByPartialName('TES');
});

test('TC_PIM_EL_004:  Search for an Employee by Valid Employee ID', async () => {
    await pimEmployeeList.clickPIMTab();
    await adminOrganization.clickTopMenu('Employee List');
    await pimEmployeeList.enterEmployeeId("ATPValue");
    await pimEmployeeList.clickSearchButton();
});

test('TC_PIM_EL_005: Filter by Employment Status', async () => {
    await pimEmployeeList.clickPIMTab();
    await pimEmployeeList.verifyPIM();
    //As Employment Status is the 1st dropdown index wise
    await pimEmployeeList.selectDropdown(0);
    await pimEmployeeList.selectDropdownOption('Full-Time Permanent');
    await adminOrganization.clickSearchButton();
});

test('TC_PIM_EL_006: Filter by Job Title', async () => {
    await pimEmployeeList.clickPIMTab();
    await pimEmployeeList.verifyPIM();
    //As Job is the 3rd dropdown index wise
    await pimEmployeeList.selectDropdown(2);
    await pimEmployeeList.selectDropdownOptionForJob('Software Engineer');
    await adminOrganization.clickSearchButton();
});

test('TC_PIM_EL_007: Combine Multiple Search Filters', async () => {
    await pimEmployeeList.clickPIMTab();
    await pimEmployeeList.verifyPIM();
    await pimEmployeeList.enterEmployeeId("12345")
    await pimEmployeeList.selectDropdown(0);
    await pimEmployeeList.selectDropdownOption('Full-Time Permanent');
    await pimEmployeeList.selectDropdown(2);
    await pimEmployeeList.selectDropdownOption('Current Employees Only');
    await pimEmployeeList.selectDropdown(2);
    await pimEmployeeList.selectDropdownOption('Software Engineer');
    await pimEmployeeList.selectDropdown(3);
    await pimEmployeeList.selectDropdownOption('Engineering');
    await adminOrganization.clickSearchButton();
});

test('TC_PIM_EL_008: Search for a Non-Existent Employee', async()=>{
    await pimEmployeeList.clickPIMTab();
    await pimEmployeeList.enterEmployeeId("99999");
    await adminOrganization.clickSearchButton();
});

test('TC_PIM_EL_009: Use "Reset" Button to Clear Filters', async()=>{
    await pimEmployeeList.clickPIMTab();
    await pimEmployeeList.enterEmployeeId("99999");
    await pimEmployeeList.clickResetButton();
});

test('TC_PIM_EL_010: Navigate to "Add Employee" Tab via "+ Add" Button', async()=>{
    await pimEmployeeList.clickPIMTab();
    await adminOrganization.clickTopMenu('Add Employee');
    await pimAddEmplyee.verifyAddEmplyeePage();
});

test('TC_PIM_EL_011: Edit an Existing Employee\'s Details', async()=>{
    await pimEmployeeList.clickPIMTab();
    await adminOrganization.clickTopMenu('Employee List');
    await pimEmployeeList.searchEmployeeByPartialName('John');
    await adminOrganization.clickEditIconByIndex(0);
    //await pimAddEmplyee.verifyAddEmplyeePage();
    await pimAddEmplyee.enterFirstName('ABC');
    await pimAddEmplyee.enterLastName('123');
    await adminOrganization.clickSaveButton();
    //await adminConfiguration.verifySuccessToast();
});

test('TC_PIM_EL_012:  Delete a Single Employee', async () => {
    await pimEmployeeList.clickPIMTab();
    await pimEmployeeList.verifyPIM();
    await pimEmployeeList.clickDeleteIcon(0);
});

test('TC_PIM_EL_013:  Sort Employee List by ID (Ascending/Descending)', async () => {
    await pimEmployeeList.clickPIMTab();
    await pimEmployeeList.verifyPIM();
    await pimEmployeeList.clickIDdropdown(); 
    await pimEmployeeList.sortEmployeeById('Ascending');
});

test('TC_PIM_EL_014:  Sort Employee List by Last Name (Ascending/Descending)', async () => {
    await pimEmployeeList.clickPIMTab();
    await pimEmployeeList.verifyPIM();
    await pimEmployeeList.clickLastNameDropDown(); 
    await pimEmployeeList.sortEmployeeById('Ascending');
});

test('TC_PIM_EL_015: Verify "Include" Dropdown Options', async () => {
    await pimEmployeeList.clickPIMTab();
    await pimEmployeeList.verifyPIM();
    await pimEmployeeList.clickIncludeDropDown(); 
    await pimEmployeeList.clickOnOptionInInclude('Current and Past Employees');
});

test('TC_PIM_EL_016: Filter by "Include" - Past Employees (if option exists)', async()=>{
    await pimEmployeeList.clickPIMTab();
    await pimEmployeeList.verifyPIM();
    await pimEmployeeList.selectDropdown(1);
    await pimEmployeeList.selectDropdownOption('Past Employees Only');
    await adminOrganization.clickSearchButton();
});

test('TC_PIM_EL_017: Verify Table Checkbox Functionality', async()=>{
    await pimEmployeeList.clickPIMTab();
    await pimEmployeeList.verifyPIM();
    await pimEmployeeList.selectCheckbox(0);
});

test('TC_PIM_EL_018: Verify Pagination (if more than one page of results)', async () => {
    await pimEmployeeList.clickPIMTab();
    await pimEmployeeList.verifyPIM();
    await pimEmployeeList.paginationToAllPages();
});
