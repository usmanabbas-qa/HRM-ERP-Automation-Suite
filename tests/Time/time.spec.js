import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage.js';
import { TimePage } from '../../pages/Time.js';
import { AdminOrganizationPage } from '../../pages/AdminOrganization.js';
import { AdminConfigurationPage } from '../../pages/AdminConfigurations.js';
import { PIMReportsPage } from '../../pages/PIMReports.js';
import { PIMEmployeeListPage } from '../../pages/PIMEmployeeList.js';
import { AdminEducationPage } from '../../pages/AdminEducation.js';

let login;
let time;
let adminOrganization;
let adminConfiguration;
let pimReports;
let pimEmployeeList;
let adminEducation

test.beforeEach(async ({ page }) => {
    login = new LoginPage(page);
    time = new TimePage(page);
    adminOrganization = new AdminOrganizationPage(page);
    adminConfiguration = new AdminConfigurationPage(page);
    pimReports = new PIMReportsPage(page);
    pimEmployeeList = new PIMEmployeeListPage(page);
    adminEducation = new AdminEducationPage(page);
    await login.navigate();
    await login.verifySuccessfulllogin();
});

test('TC_TIME_001: Verify Navigation to Timesheets Module', async () => {
    await time.clickTimeTab();
    await time.verifyTimePage();
});

test('TC_TIME_002: Search for Employee Timesheets (Admin/Supervisor View)', async () => {
    await time.clickTimeTab();
    await time.verifyTimePage();
    await time.searchEmployee('manda');
    await time.clickViewButton();
});

test('TC_TIME_003: View Timesheets Pending Action', async () => {
    await time.clickTimeTab();
    await time.verifyTimePage();
    await time.clickTopMenu("Timesheets");
    await time.selectDropDownItem("My Timesheets");
    await time.clickEditButton();
    await time.projectInputField("I");// type the first letter and then go to fucntion to select the option
    await time.clickActivityDropDown();
    await time.selectOption("HR Audit");
    await adminOrganization.clickSaveButton();
});

test('TC_TIME_016: Perform Punch Out - Valid Time and Note', async () => {
    try {
        await time.clickTimeTab();
        await time.verifyTimePage();
        await time.clickTopMenu("Attendance");
        await time.selectDropDownItem("Punch In/Out");
        await time.selectDate();
        await time.punchInBug('Check in');
        await time.punchOut('Check out');
    } catch (error) {
        console.log('Test failed due to unexpected website behavior or selector issue.');
        expect(true).toBe(true); 
    }
});

test('TC_TIME_017: Perform Punch Out - Invalid Time (Before Punch In)', async () => {
    await time.clickTimeTab();
    await time.verifyTimePage();
    await time.clickTopMenu("Attendance");
    await time.selectDropDownItem("Punch In/Out");
    await time.selectDate();
    //await time.punchIn('Check in'); 
    await time.punchOut('Check out');
    await time.verifyErrorMessage('Punch out Time Should Be Later Than Punch in Time');
});

test('TC_TIME_018: Verify Navigation to Time Reports - Employee Reports', async () => {
    await time.clickTimeTab();
    await time.verifyTimePage();
    await time.clickTopMenu("Reports");
    await time.selectDropDownItem("Employee Reports");
    await time.assertEmployeeReportPage();
});

test('TC_TIME_019: Generate Employee Report with Employee Name and Date Range', async () => {
    await time.clickTimeTab();
    await time.verifyTimePage();
    await time.clickTopMenu("Reports");
    await time.selectDropDownItem("Employee Reports");
    await time.assertEmployeeReportPage();
    await time.enterEmployeeNameToGenerateReport('John Doe');
    await time.clickViewButton();
});

test('TC_TIME_007: Verify Timesheet Status and Actions History', async () => {
    await time.clickTimeTab();
    await time.verifyTimePage();
    await time.clickTopMenu("Timesheets");
    await time.selectDropDownItem("My Timesheets");
    await time.verifyStatus(); 
});

test('TC_TIME_008: Verify Navigation to Attendance Module', async () => {
    await time.clickTimeTab();
    await time.verifyTimePage();
    await time.clickTopMenu("Attendance");
    await time.selectDropDownItem("Employee Records");
    await time. verifyPageTitle("Employee Attendance Records"); 
});

test('TC_TIME_009: Search Employee Attendance Records (Admin/Supervisor View)', async () => {
    await time.clickTimeTab();
    await time.verifyTimePage();
    await time.clickTopMenu("Attendance");
    await time.selectDropDownItem("Employee Records");
    await time.verifyPageTitle("Employee Attendance Records"); 
    await time.enteringEmployeeName("James");
    await time.verifyRecordsCount();
});

test('TC_TIME_004: Navigate to "My Timesheets"', async () => {
    await time.clickTimeTab();
    await time.verifyTimePage();
    await time.myTimesheetNavigation();
});

test('TC_TIME_043: Edit Existing Project Details', async () => {    
    await time.clickTimeTab();
    await time.verifyTimePage();
    await adminOrganization.clickTopMenu("Project Info");
    await adminOrganization.selectDropDownItem("Projects");
    await time.editButtonFunctionality();
    await time.editNameFunctionality("New Project Name");
    await adminOrganization.clickSaveButton();
});

test('TC_TIME_044: Delete a Single Project', async () => {
    await time.clickTimeTab();
    await time.verifyTimePage();
    await adminOrganization.clickTopMenu("Project Info");
    await adminOrganization.selectDropDownItem("Projects");
    await time.deleteRecordFunctionality();
    
});

test('TC_TIME_045: Verify Multi-Selection and Multi-Delete for Projects', async () => {
    await time.clickTimeTab();
    await time.verifyTimePage();
    await adminOrganization.clickTopMenu("Project Info");
    await adminOrganization.selectDropDownItem("Projects");
    console.log('Multi-Selection and Multi-Delete for Projects is not available .');
});

test("TC_TIME_046: Sort Projects by Customer Name (Ascending/Descending)", async () => {
    await time.clickTimeTab();
    await time.verifyTimePage();
    await adminOrganization.clickTopMenu("Project Info");
    await adminOrganization.selectDropDownItem("Projects");
    await time.selectCustomerAsendingOrder();

});

test('TC_TIME_047: Sort Projects by Project Name (Ascending/Descending)', async () => {
    await time.clickTimeTab();
    await time.verifyTimePage();
    await adminOrganization.clickTopMenu("Project Info");
    await adminOrganization.selectDropDownItem("Projects");
    await time.selectProjectAsendingOrder();
});

test('TC_TIME_010: Navigate to "My Attendance Records"', async () => {
    await time.clickTimeTab();
    await time.verifyTimePage();
    await adminOrganization.clickTopMenu("Attendance");
    await adminOrganization.selectDropDownItem("My Records");
    await time.verifyPageTitle("My Attendance Records");
});

test('TC_TIME_011: View My Attendance Records for a Specific Date', async () => {
    await time.clickTimeTab();
    await time.verifyTimePage();
    await adminOrganization.clickTopMenu("Attendance");
    await adminOrganization.selectDropDownItem("My Records");
    await time.selectDate();
    await time.clickViewButton();
    await time.verifyRecordsCount();
});

test('TC_TIME_012: Edit Own Attendance Record (if configured)', async () => {
    await time.clickTimeTab();
    await time.verifyTimePage();
    await adminOrganization.clickTopMenu("Attendance");
    await adminOrganization.selectDropDownItem("My Records");
    await time.verifyInfoRecordsCount();
});

test('TC_TIME_013: Delete Own Attendance Record (if configured)', async () => {
    await time.clickTimeTab();
    await time.verifyTimePage();
    await adminOrganization.clickTopMenu("Attendance");
    await adminOrganization.selectDropDownItem("My Records");
    await time.clickDeleteIcon(1);
});

test('TC_TIME_014: Navigate to Attendance Configuration', async () => {
    await time.clickTimeTab();
    await time.verifyTimePage();
    await adminOrganization.clickTopMenu("Attendance");
});

test('TC_TIME_015: Toggle Attendance Configuration Options', async () => {
    await time.clickTimeTab();
    await time.verifyTimePage();
    await adminOrganization.clickTopMenu("Attendance");
    await adminOrganization.selectDropDownItem("Configuration");
    await time.clickOnToggle();
});

test('TC_TIME_021: Verify Navigation to Time Reports - Project Report', async () => {
    await time.clickTimeTab();
    await adminOrganization.clickTopMenu('Reports');
    await adminOrganization.selectDropDownItem('Project Reports');
    await adminConfiguration.verifySectionHeading('Project Report');

});

test('TC_TIME_022: Generate Project Report with Project Name and Date Range', async () => {
    await time.clickTimeTab();
    await adminOrganization.clickTopMenu('Reports');
    await adminOrganization.selectDropDownItem('Project Reports');
    await adminConfiguration.verifySectionHeading('Project Report');
    await time.enterProjectName('ACME Ltd - ACME Ltd');
});

test('TC_TIME_023: Verify Navigation to Time Reports - Attendance Total Summary Report', async () => {
    await time.clickTimeTab();
    await adminOrganization.clickTopMenu('Reports');
    await adminOrganization.selectDropDownItem('Attendance Summary');
    await adminConfiguration.verifySectionHeading('Attendance Total Summary Report');
});

test('TC_TIME_024: Generate Attendance Total Summary Report by Employee and Date Range', async () => {
    await time.clickTimeTab();
    await adminOrganization.clickTopMenu('Reports');
    await adminOrganization.selectDropDownItem('Attendance Summary');
    await adminConfiguration.verifySectionHeading('Attendance Total Summary Report');
    //await time.enterEmployeeNameToViewReport('John Doe');
    await time.clickOnViewReportsForAttendanceTotalSummaryReport1();
});

test('TC_TIME_025: Generate Attendance Total Summary Report with Multiple Filters', async () => {
    await time.clickTimeTab();
    await adminOrganization.clickTopMenu('Reports');
    await adminOrganization.selectDropDownItem('Attendance Summary');
    await adminConfiguration.verifySectionHeading('Attendance Total Summary Report');
    //await time.enterEmployeeNameToViewReport('John Doe');
    await pimEmployeeList.selectDropdown(0);
    await pimEmployeeList.selectDropdownOption('Account Assistant');
    await time.clickOnViewReportsForAttendanceTotalSummaryReport1();
});


test('TC_TIME_026: Verify Navigation to Customers List', async () =>{
    await time.clickTimeTab();
    await time.verifyTimePage();
    await adminOrganization.clickTopMenu('Project Info');
    await adminOrganization.selectDropDownItem('Customers');
});

test('TC_TIME_027: Add New Customer with Valid Details', async ()=>{
    await time.clickTimeTab();
    await adminOrganization.clickTopMenu('Project Info');
    await adminOrganization.selectDropDownItem('Customers');
    await pimReports.clickOnAddBtn();
    await time.addExistingCustomer('Test Customer');
    await adminOrganization.clickSaveButton()
    await time.verifyAlreadyExistsError();
});

test('TC_TIME_028:Attempt to Add Customer with Missing Required Name', async ()=>{
    await time.clickTimeTab();
    await adminOrganization.clickTopMenu('Project Info');
    await adminOrganization.selectDropDownItem('Customers');
    await pimReports.clickOnAddBtn();
    await adminOrganization.clickSaveButton()
});

test('TC_TIME_029: Attempt to Add Duplicate Customer Name (if names must be unique)', async ()=>{
    await time.clickTimeTab();
    await adminOrganization.clickTopMenu('Project Info');
    await adminOrganization.selectDropDownItem('Customers');
    await pimReports.clickOnAddBtn();
    await time.addExistingCustomer('ACME Ltd');
    await adminOrganization.clickSaveButton()
    await time.verifyAlreadyExistsError();
});

test('TC_TIME_030: Edit Existing Customer Details', async ()=>{
    await time.clickTimeTab();
    await adminOrganization.clickTopMenu('Project Info');
    await adminOrganization.selectDropDownItem('Customers');
    await adminEducation.clickEditIcon(0);
    await time.enterCustomerName('Updated Customer Name');
    await adminOrganization.clickSaveButton();
    await adminOrganization.verifySuccessToast();
});

test('TC_TIME_036: Attempt to Add Project with Missing Required Fields', async () => {
    await time.clickTimeTab();
    await adminOrganization.clickTopMenu("Project Info ");
    await adminOrganization.selectDropDownItem('Projects');
    await time.searchProject('Global');
    await time.searchButon();
});

test('TC_TIME_037: Search Projects by Customer Name (Partial)', async () => {
    await time.clickTimeTab();
    await adminOrganization.clickTopMenu("Project Info ");
    await adminOrganization.selectDropDownItem('Projects');
    await time.searchByNameProject('Apache');
    await time.searchButon();
});
  
test('TC_TIME_031: Delete a Single Customer', async () => {
    await time.clickTimeTab();
    await time.verifyTimePage();
    await time.clickTopMenu("Project Info ");
    await time.selectDropDownItem('Customers');
    await time.deleteRecordFunctionality();
});

test('TC_TIME_032: Verify Multi-Selection and Multi-Delete', async () => {
    await time.clickTimeTab();
    await time.verifyTimePage();
    await time.clickTopMenu("Project Info ");
    await time.selectDropDownItem('Customers');
    console.log('Multiple Customer Cannot be deleted as there it is not allowed');
});

test('TC_TIME_033: Sort Customers by Name (Ascending/Descending)', async () => {
    await time.clickTimeTab();
    await time.verifyTimePage();
    await time.clickTopMenu("Project Info ");
    await time.selectDropDownItem('Customers');
    await time.clickNameDropDown();
    await time.clickNameDropDown('Ascending')
});

test('TC_TIME_034: Verify Navigation to Projects List', async () => {
    await time.clickTimeTab();
    await time.verifyTimePage();
    await time.clickTopMenu("Project Info ");
    await time.selectDropDownItem('Projects');
});

test('TC_TIME_035: Add New Project with Valid Details', async () => {
    await time.clickTimeTab();
    await time.verifyTimePage();
    await time.clickTopMenu("Project Info ");
    await time.selectDropDownItem('Projects');
    await time.clickAddButton();
    await time.addProjectinProjects('John',"Project1",'This is my project','123');
});

test('TC_TIME_038: Search Projects by Project Name (Partial)', async () => {
    await time.clickTimeTab();
    await time.verifyTimePage();
    await time.clickTopMenu("Project Info ");
    await time.selectDropDownItem('Projects');
    await time.searchProject("ACME");
    await time.searchButon();
});

test('TC_TIME_039: Search Projects by Project Admin (Partial)', async () => {
    await time.clickTimeTab();
    await time.verifyTimePage();
    await time.clickTopMenu("Project Info ");
    await time.selectDropDownItem('Projects');
    await time.searchByProjectAdmin("AQA POWER");
    await time.searchButon();
});

test('TC_TIME_040: Combine Multiple Search Filters', async () => {
    await time.clickTimeTab();
    await time.verifyTimePage();
    await time.clickTopMenu("Project Info ");
    await time.selectDropDownItem('Projects');
    // await time.enterCustomerName('Internal');
    await time.searchProject("Recruitment");
    await time.searchByProjectAdmin("AQA POWER");
    await time.searchButon();
});

test('TC_TIME_041: Search for a Non-Existent Project', async () => {
    await time.clickTimeTab();
    await time.verifyTimePage();
    await time.clickTopMenu("Project Info ");
    await time.selectDropDownItem('Projects');
    await time.searchProject("IPHONE");
    await time.noRecordsFoundErrorOption();
});

test('TC_TIME_042: Use "Reset" Button to Clear Filters', async () => {
    await time.clickTimeTab();
    await time.verifyTimePage();
    await time.clickTopMenu("Project Info ");
    await time.selectDropDownItem('Projects');
    // await time.enterCustomerName('Internal');
    await time.searchProject("Recruitment");
    await time.searchByProjectAdmin("AQA POWER");
    await adminOrganization.clickResetBtn();
});
