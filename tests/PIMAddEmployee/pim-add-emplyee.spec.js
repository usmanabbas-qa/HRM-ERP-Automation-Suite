import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage.js';
import { AdminOrganizationPage } from '../../pages/AdminOrganization.js';
import { PIMEmployeeListPage } from '../../pages/PIMEmployeeList.js';
import { PIMAddEmplyeePage } from '../../pages/PIMAddEmployee.js';
import { AdminNationalityPage } from '../../pages/AdminNationality.js';
import { AdminConfigurationPage } from '../../pages/AdminConfigurations.js';

let login;
let adminOrganization;
let pimEmployeeList;
let pimAddEmplyee;
let adminConfiguration;
let adminNationality;


test.beforeEach(async ({ page }) => {
    login = new LoginPage(page);
    adminOrganization = new AdminOrganizationPage(page);
    adminConfiguration = new AdminConfigurationPage(page);
    pimEmployeeList = new PIMEmployeeListPage(page);
    pimAddEmplyee = new PIMAddEmplyeePage(page);
    adminNationality = new AdminNationalityPage(page);
    await login.navigate();
    await login.verifySuccessfulllogin();
});

test('TC_PIM_AE_001: Verify Navigation to "Add Employee" Tab', async () => {
    await pimEmployeeList.clickPIMTab();
    await adminOrganization.clickTopMenu('Add Employee');
    await pimAddEmplyee.verifyAddEmplyeePage();
});

test('TC_PIM_AE_002: Add Employee with Only Required Fields (First & Last Name)', async () => {
    await pimEmployeeList.clickPIMTab();
    await adminOrganization.clickTopMenu('Add Employee');
    await pimAddEmplyee.verifyAddEmplyeePage();
    await pimAddEmplyee.enterFirstName('John');
    await pimAddEmplyee.enterLastName('Doe');
    await pimAddEmplyee.enterMiddleName('A');
    await adminOrganization.clickSaveButton();
    await adminConfiguration.verifySuccessToast();
});

test('TC_PIM_AE_005: Attempt to Save with Missing Required Fields (First Name)', async () => {
    await pimEmployeeList.clickPIMTab();
    await adminOrganization.clickTopMenu('Add Employee');
    await pimAddEmplyee.verifyAddEmplyeePage();
    await pimAddEmplyee.enterLastName('Doe');
    await pimAddEmplyee.enterMiddleName('A');
    await adminOrganization.clickSaveButton();
});

test('TC_PIM_AE_003: Add Employee with All Fields', async () => {
    await pimEmployeeList.clickPIMTab();
    await adminOrganization.clickTopMenu('Add Employee');
    await pimAddEmplyee.verifyAddEmplyeePage();
    await pimAddEmplyee.enterFirstName('John');
    await pimAddEmplyee.enterLastName('Doe');
    await pimAddEmplyee.enterMiddleName('A');
    await pimAddEmplyee.enterEmployeeId('12323');
    await adminOrganization.clickSaveButton();
    await adminConfiguration.verifySuccessToast();
});

test('TC_PIM_AE_004: Add Employee with Custom Employee ID', async () => {
    await pimEmployeeList.clickPIMTab();
    await adminOrganization.clickTopMenu('Add Employee');
    await pimAddEmplyee.addCustomEmployeeID('helen', 'De', 'Keller', '25753');
});

test('TC_PIM_AE_006 - Attempt to Save with Missing Required Fields (Last Name)', async () => {
    await pimEmployeeList.clickPIMTab();
    await adminOrganization.clickTopMenu('Add Employee');
    await pimAddEmplyee.verifyAddEmplyeePage();
    await pimAddEmplyee.enterNameField('First Name', 'Usman');
    await adminNationality.clickSave();
});

test('TC_PIM_AE_010 - Attempt to Upload Invalid Profile Picture - Incorrect Dimensions', async () => {
    await pimEmployeeList.clickPIMTab();
    await adminOrganization.clickTopMenu('Add Employee');
    await pimAddEmplyee.verifyAddEmplyeePage();
    await pimAddEmplyee.enterFirstName('John');
    await pimAddEmplyee.enterLastName('Doe');
    await pimAddEmplyee.uploadProfilePicture();
    await adminNationality.clickSave();
    await pimAddEmplyee.errorOnProfilePicture();
});

test('TC_PIM_AE_011 - Test "Cancel" Button Functionality', async () => {
    await pimEmployeeList.clickPIMTab();
    await adminOrganization.clickTopMenu('Add Employee');
    await pimAddEmplyee.verifyAddEmplyeePage();
    await adminNationality.clickCancelButton();
    await pimEmployeeList.verifyPIM();
});

test('TC_PIM_AE_012 - Create Login Details Toggle - ON', async () => {
    await pimEmployeeList.clickPIMTab();
    await adminOrganization.clickTopMenu('Add Employee');
    await pimAddEmplyee.verifyAddEmplyeePage();
    await pimAddEmplyee.enterFirstName('John');
    await pimAddEmplyee.enterLastName('Doe');
    await pimAddEmplyee.clickOnLoginToggle();
    await pimAddEmplyee.verifyLoginToggleisOn();
});

test('TC_PIM_AE_013 - Create Login Details Toggle - OFF', async () => {
    await pimEmployeeList.clickPIMTab();
    await adminOrganization.clickTopMenu('Add Employee');
    await pimAddEmplyee.verifyAddEmplyeePage();
    await pimAddEmplyee.clickOnLoginToggle();
    await pimAddEmplyee.verifyLoginToggleisOn();
    await pimAddEmplyee.clickOnLoginToggleOff();
    await pimAddEmplyee.verifyAddEmplyeePage();
});

test('TC_PIM_AE_014 - Add Employee and Create Valid Login Details', async () => {
    await pimEmployeeList.clickPIMTab();
    await adminOrganization.clickTopMenu('Add Employee');
    await pimAddEmplyee.verifyAddEmplyeePage();
    await pimAddEmplyee.enterFirstName('John');
    await pimAddEmplyee.enterLastName('Doe');
    await pimAddEmplyee.clickOnLoginToggle();
    await pimAddEmplyee.verifyLoginToggleisOn();
    await pimAddEmplyee.fillLoginDetails('John Doe', 'abc12345', 'abc12345');
    await adminNationality.clickSave();
    await adminConfiguration.verifySuccessToast();
});

test('TC_PIM_AE_015: Attempt to Create Login Details with Invalid Password Mismatch', async () => {
    await pimEmployeeList.clickPIMTab();
    await adminOrganization.clickTopMenu('Add Employee');
    await pimAddEmplyee.verifyAddEmplyeePage();
    await pimAddEmplyee.addCustomEmployeeID('AVB', 'test', '123', '25343');
    await adminConfiguration.toggleEnable(0);
    await pimAddEmplyee.enterLoginDetails('hassan.Mehmood', 'Password123', 'Password321');
    await adminNationality.clickSave();
    await pimAddEmplyee.verifyErrorToast('Passwords do not match');
});

test('TC_PIM_AE_007: Upload Valid Profile Picture', async () => {
    await pimEmployeeList.clickPIMTab();
    await adminOrganization.clickTopMenu('Add Employee');
    await pimAddEmplyee.verifyAddEmplyeePage();
    await pimAddEmplyee.enterNameField('First Name', 'salma');
    await pimAddEmplyee.enterLastNameField('Last Name', 'Ghula');
    await pimAddEmplyee.verifyProfilePictureUpload();
    await adminNationality.clickSave();
    await adminConfiguration.verifySuccessToast();
});

test('TC_PIM_AE_008: Attempt to Upload Invalid Profile Picture - Wrong File Type', async () => {
    await pimEmployeeList.clickPIMTab();
    await adminOrganization.clickTopMenu('Add Employee');
    await pimAddEmplyee.verifyAddEmplyeePage();
    await pimAddEmplyee.enterNameField('First Name', 'salma');
    await pimAddEmplyee.enterLastNameField('Last Name', 'Ghula');
    await pimAddEmplyee.uploadInvalidImage();
    await adminNationality.clickSave();
});