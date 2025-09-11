import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage.js';
import { AdminUserManagementPage } from '../../pages/AdminUserManagement.js';
import { AdminOrganizationPage } from '../../pages/AdminOrganization.js';
import { AdminEducationPage } from '../../pages/AdminEducation.js';

let login;
let adminUserManagement;
let adminOrganization;
let adminEducation;

test.beforeEach(async ({ page }) => {
    login = new LoginPage(page);
    adminUserManagement = new AdminUserManagementPage(page);
    adminOrganization = new AdminOrganizationPage(page);
    adminEducation = new AdminEducationPage(page);
    await login.navigate();
    await login.verifySuccessfulllogin();
});

test('Admin User Management - Search User', async ({ page }) => {
    await adminUserManagement.clickAdminTab();
    await adminUserManagement.verifyAdminUserManagementPage();
    await adminUserManagement.searchUser('Admin');
    await adminUserManagement.clickSearchButton();
    await adminUserManagement.verifySearchInput();
});

test('TC_ADMIN_USER_002: Search by Non-Existing Username', async ({ page }) => {
    await adminUserManagement.clickAdminTab();
    await adminUserManagement.verifyAdminUserManagementPage();
    await adminUserManagement.searchUser('invalid');
    await adminUserManagement.clickSearchButton();
    await adminOrganization.isNoRecordFoundVisible();
});


test('TC_ADMIN_USER_003: Filter by User Role', async () => {
    await adminUserManagement.clickAdminTab();
    await adminOrganization.selectUserDropdownItem('Users');
});

test('TC_ADMIN_USER_004: Search by Employee Name (Partial Match)', async () => {
    await adminUserManagement.clickAdminTab();
    await adminOrganization.clickTopMenu('User Management');
    await adminOrganization.selectDropDownItem('Users');
    await adminUserManagement.verifyAdminUserManagementPage();
    await adminUserManagement.searchUser('Admin');
    await adminUserManagement.clickSearchButton();
    await adminUserManagement.verifySearchInput();
});

test('TC_ADMIN_USER_005 : Filter by Status', async ({ page }) => {
    await adminUserManagement.clickAdminTab();
    await adminOrganization.clickTopMenu('User Management');
    await adminUserManagement.verifyAdminUserManagementPage();
    await adminOrganization.selectDropDownItem('Users');
    await adminUserManagement.clickStatusDropdown();
    await adminUserManagement.selectEnabledStatusFromDronDown();
    await adminUserManagement.clickSearchButton();

});


test('TC_ADMIN_USER_006: Combined Search Filters', async () => {
    await adminUserManagement.clickAdminTab();
    await adminUserManagement.verifyAdminUserManagementPage('Admin', 'Admin', 'user', 'Enabled');
});



test('TC_ADMIN_USER_007 - "Reset" Button Functionality', async () => {
    await adminUserManagement.clickAdminTab();
    await adminOrganization.clickTopMenu('User Management');
    await adminOrganization.selectDropDownItem('Users');
    await adminUserManagement.clickResetButton();
});

test('TC_ADMIN_USER_008 - Empty Search', async () => {
    await adminUserManagement.clickAdminTab();
    await adminOrganization.clickTopMenu('User Management');
    await adminOrganization.selectDropDownItem('Users');
    await adminUserManagement.clickSearchButton();
    await adminEducation.verifyRecordsCount();
});

test('TC_ADMIN_USER_009 - "Add" Button Functionality', async () => {
    await adminUserManagement.clickAdminTab();
    await adminOrganization.clickTopMenu('User Management');
    await adminOrganization.selectDropDownItem('Users');
    await adminUserManagement.clickAddButton();
    await adminEducation.verifyPageTitle("Add User");
});

test('TC_ADMIN_USER_010 - Edit Existing User', async () => {
    await adminUserManagement.clickAdminTab();
    await adminOrganization.clickTopMenu('User Management');
    await adminOrganization.selectDropDownItem('Users');
    await adminEducation.clickEditIcon(0);
    await adminEducation.verifyPageTitle("Edit User");
});

test('TC_ADMIN_USER_011 - Delete single User', async () => {
    await adminUserManagement.clickAdminTab();
    await adminOrganization.clickTopMenu('User Management');
    await adminOrganization.selectDropDownItem('Users');
    await adminOrganization.deleteLocationByIndex(1);
});

test('TC_ADMIN_USER_012: Records Found Accuracy', async () => {
    await adminUserManagement.clickAdminTab();
    await adminOrganization.clickTopMenu('User Management');
    await adminOrganization.selectDropDownItem('Users');
    await adminUserManagement.verifyRecordsCount();
});

test('TC_ADMIN_USER_013: Table Headers Display', async () => {
    await adminUserManagement.clickAdminTab();
    await adminOrganization.clickTopMenu('User Management');
    await adminOrganization.selectDropDownItem('Users');
    await adminUserManagement.verifyTableHeader([
        'Username',
        'User Role',
        'Employee Name',
        'Status'
    ]);;
});
