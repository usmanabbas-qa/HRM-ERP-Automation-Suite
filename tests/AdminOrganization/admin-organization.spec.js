import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage.js';
import { AdminOrganizationPage } from '../../pages/AdminOrganization.js';
import { AdminUserManagementPage } from '../../pages/AdminUserManagement.js';
import { AdminEducationPage } from '../../pages/AdminEducation.js';


let login;
let adminOrganization;
let adminUserManagement;
let adminEducation;


test.beforeEach(async ({ page }) => {
    login = new LoginPage(page);
    adminOrganization = new AdminOrganizationPage(page);
    adminUserManagement = new AdminUserManagementPage(page);
    adminEducation = new AdminEducationPage(page);
    await login.navigate();
    await login.verifySuccessfulllogin();
});


test('Admin Organization - Select Organization Item', async () => {
    await adminUserManagement.clickAdminTab();
    await adminOrganization.clickTopMenu('Organization');
    await adminOrganization.selectDropDownItem('General Information');
    await adminOrganization.verifyOrganizationName();
})

test('TC_ADMIN_ORGANZATION_002: Number of Employees Display', async () => {
    await adminUserManagement.clickAdminTab();
    await adminOrganization.clickTopMenu('Organization');
    await adminOrganization.selectDropDownItem('General Information');
    const employeeCount = await adminOrganization.getEmployeeCount();
    console.log(`Number of Employees: ${employeeCount}`);

    expect(employeeCount).toBeGreaterThan(0);

});

test('TC_ADMIN_ORGANZATION_003: Registration Number Display', async () => {
    await adminUserManagement.clickAdminTab();
    await adminOrganization.clickTopMenu('Organization');
    await adminOrganization.selectDropDownItem('General Information');
    await adminOrganization.verifyRegistrationNumberIsDisplayed();
});

test('TC_ADMIN_ORGANZATION_004: Tax ID Display', async () => {
    await adminUserManagement.clickAdminTab();
    await adminOrganization.clickTopMenu('Organization');
    await adminOrganization.selectDropDownItem('General Information');
    const TaxID = await adminOrganization.verifyTaxIdValue();
    console.log(`TaxID: ${TaxID}`);
});

// test('TC_ADMIN_ORGANZATION_005: Address Information Display', async () => {
//     await adminUserManagement.clickAdminTab();
//     await adminOrganization.clickTopMenu('Organization');
//     await adminOrganization.selectDropDownItem('General Information');
//     const phoneNo = await adminOrganization.verifyContactFields();
//     await adminOrganization.verifyContactFields();
//     console.log(`phone: ${phoneNo}`);
//     //console.log(`fax: ${faxNo}`);
// });


test('TC_ADMIN_ORGANZATION_006: Verify Visibility of Address Information Fields', async () => {
    await adminUserManagement.clickAdminTab();
    await adminOrganization.clickTopMenu('Organization');
    await adminOrganization.selectDropDownItem('General Information');
    await adminOrganization.verifyFieldVisibilityByLabel("Address Street 1");
    await adminOrganization.verifyFieldVisibilityByLabel("Address Street 2");
    await adminOrganization.verifyFieldVisibilityByLabel("City");
    await adminOrganization.verifyFieldVisibilityByLabel("State/Province");
    await adminOrganization.verifyFieldVisibilityByLabel("Zip/Postal Code");
    await adminOrganization.verifyFieldVisibilityByLabel("Country");
});

test('TC_ADMIN_ORGANZATION_007: Verify Visibility of Notes Fields', async () => {
    await adminUserManagement.clickAdminTab();
    await adminOrganization.clickTopMenu('Organization');
    await adminOrganization.selectDropDownItem('General Information');
    await adminOrganization.verifyFieldVisibilityByLabel("Notes");
});

test('TC_ADMIN_ORGANZATION_008: Verify "Edit" Toggle Button Functionality', async () => {
    await adminUserManagement.clickAdminTab();
    await adminOrganization.clickTopMenu('Organization');
    await adminOrganization.selectDropDownItem('General Information');
    await adminOrganization.clickEditToggle();
    await adminOrganization.clickSaveButton();
});

test('TC_ADMIN_ORGANZATION_009: Verify Save Button Functionality', async () => {
    await adminUserManagement.clickAdminTab();
    await adminOrganization.clickTopMenu('Organization');
    await adminOrganization.selectDropDownItem('General Information');
    await adminOrganization.clickEditToggle();
    await adminOrganization.editFieldByLabel('Tax ID', '987654321');
    await adminOrganization.editFieldByLabel('Phone', '987654321');
    await adminOrganization.editFieldByLabel('Fax', '987654321');
    await adminOrganization.editFieldByLabel('Email', 'sa98@gmail.com');
    await adminOrganization.clickSaveButton();
    await adminOrganization.verifySuccessToast();
});

test('TC_ADMIN_ORGANZATION_014: Update Address Information ', async () => {
    await adminUserManagement.clickAdminTab();
    await adminOrganization.clickTopMenu('Organization');
    await adminOrganization.selectDropDownItem('General Information');
    await adminOrganization.verifyOrganizationName();
    await adminOrganization.verifyUpdatingAddressInformation();
});

test('TC_ADMIN_ORGANZATION_015: Update Note Information ', async () => {
    await adminUserManagement.clickAdminTab();
    await adminOrganization.clickTopMenu('Organization');
    await adminOrganization.selectDropDownItem('General Information');
    await adminOrganization.verifyOrganizationName();
    await adminOrganization.verifyUpdatingNoteField1();
});

test('TC_ADMIN_ORGANZATION_016: Input Validation - Required Fields ', async () => {
    await adminUserManagement.clickAdminTab();
    await adminOrganization.clickTopMenu('Organization');
    await adminOrganization.selectDropDownItem('General Information');
    await adminOrganization.verifyOrganizationName();
    await adminOrganization.enableEditMode();
    await adminOrganization.fillBasicOrgDetails(' ', ' ', ' ', ' ');
    await adminOrganization.fillAddressDetails(' ', ' ', ' ', ' ', ' ');
    await adminOrganization.selectCountry('Benin');
    await adminOrganization.clickSaveButton();
    await adminOrganization.verifyErrorMessage();
});

test('TC_ADMIN_ORGANZATION_017: Input Validation - Invalid Format ', async () => {
    await adminUserManagement.clickAdminTab();
    await adminOrganization.clickTopMenu('Organization');
    await adminOrganization.selectDropDownItem('General Information');
    await adminOrganization.verifyOrganizationName();
    await adminOrganization.enableEditMode();
    await adminOrganization.fillBasicOrgDetails(' ', ' ', ' ', ' 11#gmial');
    await adminOrganization.fillAddressDetails(' ', ' ', ' ', ' ', ' ');
    await adminOrganization.selectCountry('Benin');
    await adminOrganization.clickSaveButton();
    await adminOrganization.verifyErrorMessage();
});

test('TC_ADMIN_ORGANZATION_018 - Input Validation - Numeric Fields', async () => {
    await adminUserManagement.clickAdminTab();
    await adminOrganization.clickTopMenu('Organization');
    await adminOrganization.selectDropDownItem('General Information');
    await adminOrganization.verifyOrganizationName();
    await adminOrganization.clickEditToggle();
    await adminOrganization.clickAndEnterPhoneNum('32512551658');
    await adminOrganization.clickAndEnterFaxNum('300016');
    await adminOrganization.clickSaveButton();
});

test('TC_ADMIN_ORGANZATION_019 - Search by Existing Location Name', async () => {
    await adminUserManagement.clickAdminTab();
    await adminOrganization.clickTopMenu('Organization');
    await adminOrganization.selectDropDownItem('Locations');
    await adminOrganization.EnterLocationName('new york');
    await adminOrganization.clickSearchButton();
    await adminOrganization.getRecordCount();
});

test('TC_ADMIN_ORGANZATION_020 - Search by Non-Existing Location Name', async () => {
    await adminUserManagement.clickAdminTab();
    await adminOrganization.clickTopMenu('Organization');
    await adminOrganization.selectDropDownItem('Locations');
    await adminOrganization.EnterLocationName('non existing');
    await adminOrganization.clickSearchButton();
    await adminOrganization.isNoRecordFoundVisible();
});

test('TC_ADMIN_ORGANZATION_021 - Search by City', async () => {
    await adminUserManagement.clickAdminTab();
    await adminOrganization.clickTopMenu('Organization');
    await adminOrganization.selectDropDownItem('Locations');
    await adminOrganization.EnterLocationCity('new york');
    await adminOrganization.clickSearchButton();
    await adminOrganization.getRecordCount();
});

test('TC_ADMIN_ORGANIZATION_022 - Filter by Country', async () => {
    await adminUserManagement.clickAdminTab();
    await adminOrganization.clickTopMenu('Organization');
    await adminOrganization.selectDropDownItem('Locations');
    await adminOrganization.selectCountry('United States');
    await adminOrganization.clickSearchButton();
    await adminOrganization.verifyRecordsFoundLabel();
});

test('TC_ADMIN_ORGANIZATION_023: Combined Search Filters', async () => {
    await adminUserManagement.clickAdminTab();
    await adminOrganization.clickTopMenu('Organization');
    await adminOrganization.selectDropDownItem('Locations');
    await adminOrganization.verifyLocationSearchFunctionality('New', 'new york', 'America');
});

test('TC_ADMIN_ORGANZATION_024: "Reset" Button Functionality', async () => {
    await adminUserManagement.clickAdminTab();
    await adminOrganization.clickTopMenu('Organization');
    await adminOrganization.selectDropDownItem('Locations');
    await adminOrganization.enterName();
    await adminOrganization.enterCity();
    await adminOrganization.selectCountry("Pakistan");
    await adminOrganization.clickResetBtn();
});

test('TC_ADMIN_ORGANIZATION_025: Empty Search', async () => {
    await adminUserManagement.clickAdminTab();
    await adminOrganization.clickTopMenu('Organization');
    await adminOrganization.selectDropDownItem('Locations');
    await adminOrganization.clickSearchButton()
    await adminOrganization.verifyRecordsFoundLabel();
});


test('TC_ADMIN_ORGANZATION_026: Verify "Add" Button Functionality', async () => {
    await adminUserManagement.clickAdminTab();
    await adminOrganization.clickTopMenu('Organization');
    await adminOrganization.selectDropDownItem('Locations');
    await adminOrganization.clickAddButtonOnLocationPage();

});

test('TC_ADMIN_ORGANZATION_027 : Edit Existing Location', async () => {
    await adminUserManagement.clickAdminTab();
    await adminOrganization.clickTopMenu('Organization');
    await adminOrganization.selectDropDownItem('Locations');
    await adminOrganization.clickEditLocation();
    await adminOrganization.clickSaveButton();
    await adminOrganization.verifySuccessToast();
});

test('TC_ADMIN_ORGANZATION_028 : Delete Single Location', async () => {
    await adminUserManagement.clickAdminTab();
    await adminOrganization.clickTopMenu('Organization');
    await adminOrganization.selectDropDownItem('Locations');
    await adminOrganization.deleteLocationByIndex(0);
});

test('TC_ADMIN_ORGANZATION_029 : Root Node Display', async () => {
    await adminUserManagement.clickAdminTab();
    await adminOrganization.clickTopMenu('Organization');
    await adminOrganization.selectDropDownItem('Structure');
    await adminOrganization.verifyTopLevelNodeText();
});

test('TC_ADMIN_ORGANIZATION_030 - Verify Hierarchical Display of Organization Structure', async () => {
    await adminUserManagement.clickAdminTab();
    await adminOrganization.clickTopMenu('Organization');
    await adminOrganization.selectDropDownItem('Structure');
    await adminEducation.verifyPageTitle('Organization Structure');
    await adminOrganization.verifyOrgNodeVisible('100: Administration');
    await adminOrganization.verifyOrgNodeVisible('Engineering');
    await adminOrganization.clickToggle_Engineering();
    await adminOrganization.clickToggle_SalesAndMarketing();
    await adminOrganization.clickToggle_ClientServices();
    await adminOrganization.verifyEngineeringChildNodes(['Development', 'Quality Assurance', 'TechOps']);
    // await adminOrganization.verifySalesAndMarketingChildNodes(['Sales', 'Marketing']);
    await adminOrganization.verifyOrgNodeVisible('Client Services');
    await adminOrganization.verifyClientServicesChildNodes(['Technical Support']);
    await adminOrganization.verifyOrgNodeVisible('Finance');
    await adminOrganization.verifyOrgNodeVisible('Human Resources');
    await adminOrganization.verifyOrgNodeVisible('1: hola');
    await adminOrganization.verifyOrgNodeVisible('juan perez');
});

test('TC_ADMIN_ORGANIZATION_031 - Department/Unit Names Display', async () => {
    await adminUserManagement.clickAdminTab();
    await adminOrganization.clickTopMenu('Organization');
    await adminOrganization.selectDropDownItem('Structure');
    await adminEducation.verifyPageTitle('Organization Structure');
    await adminOrganization.verifyOrgNodeVisible('100: Administration');
    await adminOrganization.verifyOrgNodeVisible('Engineering');
    await adminOrganization.verifyOrgNodeVisible('Client Services');
    await adminOrganization.verifyOrgNodeVisible('Finance');
    await adminOrganization.verifyOrgNodeVisible('Human Resources');
    await adminOrganization.verifyOrgNodeVisible('1: hola');
    await adminOrganization.verifyOrgNodeVisible('juan perez');
});

test('TC_ADMIN_ORGANIZATION_032 - Expand/Collapse Functionality', async () => {
    await adminUserManagement.clickAdminTab();
    await adminOrganization.clickTopMenu('Organization');
    await adminOrganization.selectDropDownItem('Structure');
    await adminEducation.verifyPageTitle('Organization Structure');
    await adminOrganization.verifyOrgNodeVisible('100: Administration');
    await adminOrganization.verifyOrgNodeVisible('Engineering');
    await adminOrganization.clickToggle_Engineering();
    await adminOrganization.verifyOrgNodeVisible('Sales & Marketing');
    await adminOrganization.clickToggle_SalesAndMarketing();
    await adminOrganization.verifyOrgNodeVisible('Client Services');
    await adminOrganization.clickToggle_ClientServices();
    await adminOrganization.verifyOrgNodeVisible('Finance');
    await adminOrganization.verifyOrgNodeVisible('Human Resources');
    await adminOrganization.verifyOrgNodeVisible('1: hola');
    await adminOrganization.verifyOrgNodeVisible('juan perez');
    // for Collapsing the node again call this 
    await adminOrganization.clickToggle_Engineering();
    await adminOrganization.clickToggle_SalesAndMarketing();
    await adminOrganization.clickToggle_ClientServices();
});

test('TC_ADMIN_ORGANIZATION_033: "Edit" Toggle Button Functionality', async()=>{
    await adminUserManagement.clickAdminTab();
    await adminOrganization.clickTopMenu('Organization');
    await adminOrganization.selectDropDownItem('Structure');
    await adminEducation.verifyPageTitle('Organization Structure');
    await adminOrganization.enableEditMode();
    await adminOrganization.verifyEditModeEnabled();
})

test('TC_ADMIN_ORGANIZATION_034: Add New Organizational Unit', async()=>{
    await adminUserManagement.clickAdminTab();
    await adminOrganization.clickTopMenu('Organization');
    await adminOrganization.selectDropDownItem('Structure');
    await adminEducation.verifyPageTitle('Organization Structure');
    await adminOrganization.enableEditMode();
    await adminOrganization.AddNewOrganizationUnit();
    await adminOrganization.enterNewOrganizationName();
    await adminOrganization.clickSaveButton();
    await adminOrganization.verifySuccesMsg();
});

test('TC_ADMIN_ORGANIZATION_035: Edit Existing Organizational Unit', async()=>{
    await adminUserManagement.clickAdminTab();
    await adminOrganization.clickTopMenu('Organization');
    await adminOrganization.selectDropDownItem('Structure');
    await adminEducation.verifyPageTitle('Organization Structure');
    await adminOrganization.enableEditMode();
    await adminOrganization.clickEditIconByIndex(7);
    await adminOrganization.editOrganizationInputField(2,"hrm orange");
    await adminOrganization.clickSaveButton();
});

test('TC_ADMIN_ORGANIZATION_036: Delete Organizational Unit', async()=>{
    await adminUserManagement.clickAdminTab();
    await adminOrganization.clickTopMenu('Organization');
    await adminOrganization.selectDropDownItem('Structure');
    await adminEducation.verifyPageTitle('Organization Structure');
    await adminOrganization.enableEditMode();
    await adminOrganization.AddNewOrganizationUnit();
    await adminOrganization.enterNewOrganizationName();
    await adminOrganization.clickSaveButton()
    await adminOrganization.verifySuccesMsg();
    await adminOrganization.deleteStructureByIndex();
});

test('TC_ADMIN_ORGANZATION_013 : Update Contact Information', async () => {
    await adminUserManagement.clickAdminTab();
    await adminOrganization.clickTopMenu('Organization');
    await adminOrganization.selectDropDownItem('General Information');
    await adminOrganization.clickEditToggle();
    await adminOrganization.editFieldByLabel('Tax ID', '987654321');
    await adminOrganization.editFieldByLabel('Phone', '987654321');
    await adminOrganization.editFieldByLabel('Fax', '987654321');
    await adminOrganization.editFieldByLabel('Email', 'sa98@gmail.com');
    await adminOrganization.clickSaveButton();
    await adminOrganization.verifySuccessToast();
});

test('TC_ADMIN_ORGANZATION_010 : Number of Employees Visible in Organization', async () => {
    await adminUserManagement.clickAdminTab();
    await adminOrganization.clickTopMenu('Organization');
    await adminOrganization.selectDropDownItem('General Information');
    await adminOrganization.clickEditToggle();
    await adminOrganization.clickSaveButton();
    await adminOrganization.verifyNoOfEmployee();
});

test('TC_ADMIN_ORGANZATION_011 : Update Registration Number ', async () => {
    await adminUserManagement.clickAdminTab();
    await adminOrganization.clickTopMenu('Organization');
    await adminOrganization.selectDropDownItem('General Information');
    await adminOrganization.clickEditToggle();
    await adminOrganization.fillRegistrationNumber('123456789');
    await adminOrganization.clickSaveButton();
    await adminOrganization.verifySuccessToast();
});

test('TC_ADMIN_ORGANZATION_012 : Update Tax ID ', async () => {
    await adminUserManagement.clickAdminTab();
    await adminOrganization.clickTopMenu('Organization');
    await adminOrganization.selectDropDownItem('General Information');
    await adminOrganization.clickEditToggle();
    await adminOrganization.editFieldByLabel('Tax ID', '987654321');
    await adminOrganization.clickSaveButton();
    await adminOrganization.verifySuccessToast();
});