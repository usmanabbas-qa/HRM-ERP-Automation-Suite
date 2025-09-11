import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage.js';
import { AdminJob } from '../../pages/AdminJob.js';
import { AdminUserManagementPage } from '../../pages/AdminUserManagement.js';
import { AdminOrganizationPage } from '../../pages/AdminOrganization.js';


let login;
let adminJob;
let adminOrganization;
let adminUserManagement;

test.beforeEach(async ({ page }) => {
    login = new LoginPage(page);
    adminJob = new AdminJob(page);
    adminOrganization = new AdminOrganizationPage(page);
    adminUserManagement = new AdminUserManagementPage(page);
    await login.navigate();
    await login.verifySuccessfulllogin();
});

test('TC_ADMIN_JOB_001: "Job" Menu Item Active State', async () => {
    await adminUserManagement.clickAdminTab();
    await adminOrganization.clickTopMenu('Job');
    await adminOrganization.selectDropDownItem('Job Titles');
    await adminJob.verifyJobTitilePage();
});

test('TC_ADMIN_JOB_003: Edit Existing Job Title', async () => {
    await adminUserManagement.clickAdminTab();
    await adminOrganization.clickTopMenu('Job');
    await adminOrganization.selectDropDownItem('Job Titles');
    await adminJob.clickEditIcon(1);
    await adminJob.editJobTitle('Senior Software Engineer');
    await adminOrganization.clickSaveButton();
});

test('TC_ADMIN_JOB_004: Delete Single Job Title', async () => {
    await adminUserManagement.clickAdminTab();
    await adminOrganization.clickTopMenu('Job');
    await adminOrganization.selectDropDownItem('Job Titles');
    await adminJob.clickDeleteIcon(1);
});

test('TC_ADMIN_JOB_005 : "Records Found" Count Accuracy', async () => {
    await adminUserManagement.clickAdminTab();
    await adminOrganization.clickTopMenu('Job');
    await adminOrganization.selectDropDownItem('Job Titles');
    await adminJob.verifyRecordsCount();
});

test('TC_ADMIN_JOB_006: "Add" Button Functionality', async () => {
    await adminUserManagement.clickAdminTab();
    await adminOrganization.clickTopMenu('Job');
    await adminOrganization.selectDropDownItem('Pay Grades');
    await adminJob.verifyAddButtonFunctionality();
});

test("TC_ADMIN_JOB_007 - Edit Existing Pay Grade", async () => {
    await adminUserManagement.clickAdminTab();
    await adminOrganization.clickTopMenu('Job');
    await adminOrganization.selectDropDownItem('Pay Grades');
    await adminJob.clickEditIcon(1);
    await adminJob.verifyPageTitle('Edit Pay Grade');
});

test('TC_ADMIN_JOB_008: Delete Single Pay Grade', async () => {
    await adminUserManagement.clickAdminTab();
    await adminOrganization.clickTopMenu('Job');
    await adminOrganization.selectDropDownItem('Pay Grades');
    await adminOrganization.deleteLocationByIndex(0);
});

test('TC_ADMIN_JOB_009: Table Headers Display', async () => {
    await adminUserManagement.clickAdminTab();
    await adminOrganization.clickTopMenu('Job');
    await adminOrganization.selectDropDownItem('Pay Grades');
    await adminJob.verifyHeader('Name');
    await adminJob.verifyHeader('Currency');
    await adminJob.verifyHeader('Actions');

});

test('TC_ADMIN_JOB_010: "Records Found" Count Accuracy', async () => {
    await adminUserManagement.clickAdminTab();
    await adminOrganization.clickTopMenu('Job');
    await adminOrganization.selectDropDownItem('Pay Grades');
    await adminUserManagement.verifyRecordsCount();
});


test('TC_ADMIN_JOB_011: "Add" Button Functionality', async() =>{
    await adminUserManagement.clickAdminTab();
    await adminOrganization.clickTopMenu('Job');
    await adminOrganization.selectDropDownItem('Employment Status');
    await adminJob.verifyAddButtonFunctionality();
});

test('TC_ADMIN_JOB_012: Edit Existing Employment Status', async() =>{
    await adminUserManagement.clickAdminTab();
    await adminOrganization.clickTopMenu('Job');
    await adminOrganization.selectDropDownItem('Employment Status');
    await adminJob.clickEditIcon(0);
    //this edit job title is valid for all input name fields thats why using this 
    await adminJob.editJobTitle('Full TIME');
    await adminOrganization.clickSaveButton();
});

test('TC_ADMIN_JOB_013: Delete Single Employment Status', async() =>{
    await adminUserManagement.clickAdminTab();
    await adminOrganization.clickTopMenu('Job');
    await adminOrganization.selectDropDownItem('Employment Status');
    await adminOrganization.deleteLocationByIndex(0);
});

test('TC_ADMIN_JOB_014: "Records Found" Count Accuracy', async() =>{
    await adminUserManagement.clickAdminTab();
    await adminOrganization.clickTopMenu('Job');
    await adminOrganization.selectDropDownItem('Employment Status');
    await adminUserManagement.verifyRecordsCount();
});
test('TC_ADMIN_JOB_015: "Add" Button Functionality', async() =>{
    await adminUserManagement.clickAdminTab();
    await adminOrganization.clickTopMenu('Job');
    await adminOrganization.selectDropDownItem('Job Categories');
    await adminJob.verifyAddButtonFunctionality();
});
test('TC_ADMIN_JOB_016: Edit Existing Job Category', async()=>{
    await adminUserManagement.clickAdminTab();
    await adminOrganization.clickTopMenu('Job');
    await adminOrganization.selectDropDownItem('Job Categories');
    await adminJob.clickEditIcon(1);
    await adminJob.verifyPageTitle('Edit Job Category');
});

test('TC_ADMIN_JOB_017: Delete Single Job Category', async()=>{
    await adminUserManagement.clickAdminTab();
    await adminOrganization.clickTopMenu('Job');
    await adminOrganization.selectDropDownItem('Job Categories');
    await adminOrganization.deleteLocationByIndex(0);
    await adminUserManagement.verifyRecordsCount();
});

test('TC_ADMIN_JOB_018: "Records Found" Count Accuracy', async()=>{
    await adminUserManagement.clickAdminTab();
    await adminOrganization.clickTopMenu('Job');
    await adminOrganization.selectDropDownItem('Job Categories');
    await adminUserManagement.verifyRecordsCount();
})

test('TC_ADMIN_JOB_019: "Add" Button Functionality', async() =>{
    await adminUserManagement.clickAdminTab();
    await adminOrganization.clickTopMenu('Job');
    await adminOrganization.selectDropDownItem('Work Shifts');
    await adminJob.verifyAddButtonFunctionality();
});

test('TC_ADMIN_JOB_020: Edit Existing Work Shif', async() =>{
    await adminUserManagement.clickAdminTab();
    await adminOrganization.clickTopMenu('Job');
    await adminOrganization.selectDropDownItem('Work Shifts');
    await adminJob.clickEditIcon(1);
    await adminJob.verifyPageTitle('Edit Work Shift');
});

test('TC_ADMIN_JOB_021: Delete Single Work Shift', async() =>{
    await adminUserManagement.clickAdminTab();
    await adminOrganization.clickTopMenu('Job');
    await adminOrganization.selectDropDownItem('Work Shifts');
    await adminOrganization.deleteLocationByIndex(0);
});

test('TC_ADMIN_JOB_022: "Records Found" Count Accuracy', async() =>{
    await adminUserManagement.clickAdminTab();
    await adminOrganization.clickTopMenu('Job');
    await adminOrganization.selectDropDownItem('Work Shifts');
    await adminUserManagement.verifyRecordsCount();
});

test('TC_ADMIN_JOB_002:"Add" Button Functionality', async () => {
    await adminUserManagement.clickAdminTab();
    await adminOrganization.clickTopMenu('Job');
    await adminOrganization.selectDropDownItem('Job Titles');
    await adminJob.clickAdd();
});