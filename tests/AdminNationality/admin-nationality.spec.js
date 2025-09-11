import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage.js';
import { AdminNationalityPage } from '../../pages/AdminNationality.js';
import { AdminUserManagementPage } from '../../pages/AdminUserManagement.js';
import { AdminOrganizationPage } from '../../pages/AdminOrganization.js';
import { AdminJob } from '../../pages/AdminJob.js';
import { AdminEducationPage } from '../../pages/AdminEducation.js';

let login;
let adminNationality;
let adminUserManagement;
let adminEducation;
let adminOrganization;
let adminJob;

test.beforeEach(async ({ page }) => {
    login = new LoginPage(page);
    adminNationality = new AdminNationalityPage(page);
    adminUserManagement = new AdminUserManagementPage(page);
    adminEducation = new AdminEducationPage(page);
    adminOrganization = new AdminOrganizationPage(page);
    adminJob = new AdminJob(page);
    await login.navigate();
    await login.verifySuccessfulllogin();
});

test('Admin Nationality', async () => {
    await adminUserManagement.clickAdminTab();
    await adminNationality.clickOnNationalities();
    await adminNationality.assertNationalitiesTable();
});

test('TC_ADMIN_NAT_002: Add a Valid Unique Nationality', async () => {
    await adminUserManagement.clickAdminTab();
    await adminNationality.clickOnNationalities();
    await adminNationality.clickAddnationality();
    await adminNationality.AddNationalityName();
    await adminNationality.clickSave();
    await adminNationality.nationalityAddedSuccessfully();
    

});

test('TC_ADMIN_NAT_003: Attempt to Add a Duplicate Nationality', async () => {
    await adminUserManagement.clickAdminTab();
    await adminOrganization.clickTopMenu('Nationalities');
    await adminNationality.clickAddnationality();
    await adminNationality.AddNationalityName();
    await adminNationality.clickSave();
    await adminNationality.verifyNationalityErrorMessage();
    

});

test('TC_ADMIN_NAT_004: Attempt to Add a Empty Nationality', async () => {
    await adminUserManagement.clickAdminTab();
    await adminOrganization.clickTopMenu('Nationalities');
    await adminNationality.clickAddnationality();
    await adminNationality.AddNationalityName("");
    await adminNationality.clickSave();
    await adminNationality.verifyRequiredFieldErrorMessage();
});

test('TC_ADMIN_NAT_005: Edit an Existing Nationality Name', async () => {
     await adminUserManagement.clickAdminTab();
     await adminNationality.clickOnNationalities();
    // await adminNationality.clickAddnationality();
    // await adminNationality.AddNationalityName('Test123455');
    // await adminNationality.clickSave();
    await adminJob.clickEditIcon(1);
    await adminNationality.clearNationalityName();
    //await adminNationality.AddNationalityName('Test123');
    //await adminNationality.clickSave();
    //await adminNationality.nationalityAddedSuccessfully();
})

test('TC_ADMIN_NAT_006: Delete a Single Nationality', async()=>{
    await adminUserManagement.clickAdminTab();
    await adminOrganization.clickTopMenu('Nationalities');
    await adminOrganization.deleteLocationByIndex(0)
})

test('TC_ADMIN_NAT_007: Delete Multiple Nationalities', async()=>{
    await adminUserManagement.clickAdminTab();
    await adminOrganization.clickTopMenu('Nationalities');
    await adminOrganization.multipleDeleteByIndexes([0,1,2])
})

test('TC_ADMIN_NAT_008: Cancel Add Nationality Operation', async () => {
    await adminUserManagement.clickAdminTab();
    await adminOrganization.clickTopMenu('Nationalities');
    await adminNationality.clickAddnationality();
    await adminNationality.AddNationalityName('TestCancel');
    await adminNationality.clickCancelButton();
});

test('TC_ADMIN_NAT_009  :  Cancel Edit Nationality Operation ', async () => {
    await adminUserManagement.clickAdminTab();
    await adminOrganization.clickTopMenu('Nationalities');
    await adminJob.clickEditIcon(1);
    await adminNationality.clickCancelButton();
});

test('TC_ADMIN_NAT_010: Verify Display of All Records and Pagination', async () => {
    await adminUserManagement.clickAdminTab();
    await adminNationality.clickOnNationalities();
    await adminJob.verifyRecordsCount();
    await adminNationality.paginateAllPages();
});

test('TC_ADMIN_NAT_011: Add Nationality with Max Allowed Length', async () => {
    await adminUserManagement.clickAdminTab();
    await adminOrganization.clickTopMenu('Nationalities');
    await adminNationality.clickAddnationality();
    //change the words to check this save max 100 characters
    await adminNationality.AddNationalityName("sdfasdfafadscsfsfacssacfasfcrejhhhhhhhhhhdsgakkkkkkkkkkkkkkytrhytnynyyththrthrthtrhrthw");
    await adminNationality.clickSave();
    await adminOrganization.verifySuccessToast();
    console.log(" Successfully added!! ");
});

test('TC_ADMIN_NAT_012: Add Nationality with Special Characters', async () => {
    await adminUserManagement.clickAdminTab();
    await adminOrganization.clickTopMenu('Nationalities');
    await adminNationality.clickAddnationality();
    //add special characters before excuting the test 
    await adminNationality.AddNationalityName("@US$M^&!@");
    await adminNationality.clickSave();
});

test('TC_ADMIN_NAT_013: Add Nationality with Leading/Trailing Spaces', async () => {
    await adminUserManagement.clickAdminTab();
    await adminOrganization.clickTopMenu('Nationalities');
    await adminNationality.clickAddnationality();
    await adminNationality.AddNationalityName('  German  ');
    await adminNationality.clickSave();
});

test('TC_ADMIN_NAT_014: Attempt to Delete Without Selection', async () => {
    await adminUserManagement.clickAdminTab();
    await adminOrganization.clickTopMenu('Nationalities');
    await adminNationality.clickAddnationality();
    await adminNationality.AddNationalityName('  American  ');
    await adminNationality.clickSave();
    await adminOrganization.verifySuccessToast();
    await adminNationality.clickDeleteIcon(0);


});

test('TC_ADMIN_NAT_015: Verify "Select All" Checkbox Functionality', async () => {
    await adminUserManagement.clickAdminTab();
    await adminOrganization.clickTopMenu('Nationalities');
    await adminNationality.clickOnAllNationalityCheckbox();
});

test('TC_ADMIN_NAT_016: Verify Confirmation Dialog on Delete', async()=>{
    await adminUserManagement.clickAdminTab();
    await adminOrganization.clickTopMenu('Nationalities');
    await adminEducation.clickDeleteIcon(0)
    await adminEducation.verifyDeleteConfirmationDialog();
});