import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage.js';
import { AdminEducationPage } from '../../pages/AdminEducation.js';
import { AdminUserManagementPage } from '../../pages/AdminUserManagement.js';
import { AdminOrganizationPage } from '../../pages/AdminOrganization.js';




let login;
let adminEducation;
let adminUserManagement;
let adminOrganization;

test.beforeEach(async ({ page }) => {
    login = new LoginPage(page);
    adminEducation = new AdminEducationPage(page);
    adminOrganization = new AdminOrganizationPage(page);
    adminUserManagement = new AdminUserManagementPage(page);
    await login.navigate();
    await login.verifySuccessfulllogin();
});


test('TC_ADMIN_QUALIFICATION_001: Verify "Add" Button Functionality', async () => {
    await adminUserManagement.clickAdminTab();
    await adminOrganization.clickTopMenu('Qualifications');
    await adminOrganization.selectDropDownItem('Skills');
    await adminEducation.clickAddButton();
});

test('TC_ADMIN_QUALIFICATION_002: Edit Education Record', async () => {
    await adminUserManagement.clickAdminTab();
    await adminOrganization.clickTopMenu('Qualifications');
    await adminOrganization.selectDropDownItem('Education');
    await adminEducation.clickEditIcon(0);
    await adminEducation.clickSaveButton();
    await adminEducation.verifySuccessToast();

});

test("TC_ADMIN_QUALIFICATION_003 - Delete Single Skill", async () => {
    await adminUserManagement.clickAdminTab();
    await adminOrganization.clickTopMenu('Qualifications');
    await adminOrganization.selectDropDownItem('Skills');
    await adminEducation.clickDeleteIcon(1);
    await adminEducation.confirmDelete();
});

test('TC_ADMIN_QUALIFICATION_004: "Records Found" Count Accuracy', async () => {
    await adminUserManagement.clickAdminTab();
    await adminOrganization.clickTopMenu('Qualifications');
    await adminOrganization.selectDropDownItem('Skills');
    await adminEducation.verifyRecordsCount();
});


test('TC_ADMIN_QUALIFICATION_005: "Add" Button Functionality', async () => {
    await adminUserManagement.clickAdminTab();
    await adminOrganization.clickTopMenu('Qualifications');
    await adminOrganization.selectDropDownItem('Education');
    await adminEducation.clickOnAddButton();
    await adminEducation.verifyAddEducationPage();
})

test('TC_ADMIN_QUALIFICATION_006: Delete Single Education Record', async () => {
    await adminUserManagement.clickAdminTab();
    await adminOrganization.clickTopMenu('Qualifications');
    await adminOrganization.selectDropDownItem('Education');
    await adminEducation.clickDeleteIcon(2);
    await adminEducation.confirmDelete();
});

test('TC_ADMIN_QUALIFICATION_007: "Records Found" Count Accuracy', async () => {
    await adminUserManagement.clickAdminTab();
    await adminOrganization.clickTopMenu('Qualifications');
    await adminOrganization.selectDropDownItem('Education');
    await adminEducation.verifyPageTitle("Education");
    await adminEducation.verifyRecordsCount();
});

test('TC_ADMIN_QUALIFICATION_008: "Edit Existing Education Record', async () => {
    await adminUserManagement.clickAdminTab();
    await adminOrganization.clickTopMenu('Qualifications');
    await adminOrganization.selectDropDownItem('Education');
    await adminEducation.clickEditIcon(0);
    await adminEducation.clickSaveButton();
    await adminEducation.verifySuccessToast();
});

test('TC_ADMIN_QUALIFICATION_009: "Add" Button Functionality', async () => {
    await adminUserManagement.clickAdminTab();
    await adminOrganization.clickTopMenu('Qualifications');
    await adminOrganization.selectDropDownItem('Licenses');
    await adminEducation.clickOnAddButton();
    await adminEducation.verifyPageTitle("Add License")
});

test('TC_ADMIN_QUALIFICATION_010: Edit Existing License Record', async () => {
    await adminUserManagement.clickAdminTab();
    await adminOrganization.clickTopMenu('Qualifications');
    await adminOrganization.selectDropDownItem('Licenses');
    await adminEducation.clickEditIcon(0);
    await adminEducation.verifyPageTitle("Edit License")
    await adminEducation.clickSaveButton();
    await adminEducation.verifySuccessToast();
});

test('TC_ADMIN_QUALIFICATION_011: Delete Single License Record', async () => {
    await adminUserManagement.clickAdminTab();
    await adminOrganization.clickTopMenu('Qualifications');
    await adminOrganization.selectDropDownItem('Licenses');
    await adminOrganization.deleteLocationByIndex(1);

});

test('TC_ADMIN_QUALIFICATION_012: "Records Found" Count Accuracy', async () => {
    await adminUserManagement.clickAdminTab();
    await adminOrganization.clickTopMenu('Qualifications');
    await adminOrganization.selectDropDownItem('Licenses');
    await adminUserManagement.verifyRecordsCount();
});

test('TC_ADMIN_QUALIFICATION_013: "Add" Button Functionality', async () => {
    await adminUserManagement.clickAdminTab();
    await adminOrganization.clickTopMenu('Qualifications');
    await adminOrganization.selectDropDownItem('Languages');
    await adminEducation.clickOnAddButton();
    await adminEducation.verifyPageTitle("Add Language")
}); 

test('TC_ADMIN_QUALIFICATION_014: Delete  Record', async () => {
    await adminUserManagement.clickAdminTab();
    await adminOrganization.clickTopMenu('Qualifications');
    await adminOrganization.selectDropDownItem('Languages');
    await adminOrganization.deleteLocationByIndex(1);
})

test('TC_ADMIN_QUALIFICATION_015: "Records Found" Count Accuracy', async () => {
    await adminUserManagement.clickAdminTab();
    await adminOrganization.clickTopMenu('Qualifications');
    await adminOrganization.selectDropDownItem('Languages');
    await adminUserManagement.verifyRecordsCount();
});

test('TC_ADMIN_QUALIFICATION_016: "Add" Button Functionality', async () => {
    await adminUserManagement.clickAdminTab();
    await adminOrganization.clickTopMenu('Qualifications');
    await adminOrganization.selectDropDownItem('Memberships');
    await adminEducation.clickOnAddButton();
    await adminEducation.verifyPageTitle("Add Membership")
}); 

test('TC_ADMIN_QUALIFICATION_017: Add Membership Record', async () => {
    await adminUserManagement.clickAdminTab();
    await adminOrganization.clickTopMenu('Qualifications');
    await adminOrganization.selectDropDownItem('Memberships');
    await adminEducation.clickOnAddButton();
    await adminEducation.addMemberShipName('Test Membership');
    await adminEducation.clickSaveButton();
    await adminEducation.verifySuccessToast();
});

test('TC_ADMIN_QUALIFICATION_018: Delete Single Membership Record', async () => {
    await adminUserManagement.clickAdminTab();
    await adminOrganization.clickTopMenu('Qualifications');
    await adminOrganization.selectDropDownItem('Memberships');
    await adminOrganization.deleteLocationByIndex(1);
});

test('TC_ADMIN_QUALIFICATION_019: "Records Found" Count Accuracy', async()=>{
    await adminUserManagement.clickAdminTab();
    await adminOrganization.clickTopMenu('Qualifications');
    await adminOrganization.selectDropDownItem('Memberships');
    await adminUserManagement.verifyRecordsCount();
});