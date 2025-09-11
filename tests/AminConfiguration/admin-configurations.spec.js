import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage.js';
import { AdminOrganizationPage } from '../../pages/AdminOrganization.js';
import { AdminUserManagementPage } from '../../pages/AdminUserManagement.js';
import { AdminConfigurationPage } from '../../pages/AdminConfigurations.js';
import { AdminJob } from '../../pages/AdminJob.js';

let login;
let adminOrganization;
let adminUserManagement;
let adminConfiguration;
let adminJob;

test.beforeEach(async ({ page }) => {
    login = new LoginPage(page);
    adminOrganization = new AdminOrganizationPage(page);
    adminUserManagement = new AdminUserManagementPage(page);
    adminConfiguration = new AdminConfigurationPage(page);
    adminJob = new AdminJob(page);
    await login.navigate();
    await login.verifySuccessfulllogin();
});

test('TC_ADMIN_CONFI_001: Verify Navigation to Email Configuration', async () => {
    await adminUserManagement.clickAdminTab();
    await adminOrganization.clickTopMenu('Configuration');
    await adminOrganization.selectDropDownItem('Email Configuration');
    await adminConfiguration.verifySectionHeading('Email Configuration');
});

test('TC_ADMIN_CONFI_002: Save Valid "Mail Sent As" (Sendmail)', async () => {
    await adminUserManagement.clickAdminTab();
    await adminOrganization.clickTopMenu('Configuration');
    await adminOrganization.selectDropDownItem('Email Configuration');
    await adminConfiguration.verifySectionHeading('Email Configuration');
    await adminConfiguration.enterMailInConfiguration("test@gmail.com");
    await adminOrganization.clickSaveButton();
});

test('TC_ADMIN_CONFI_003: Save Valid "Mail Sent As" (SMTP)', async () => {
    await adminUserManagement.clickAdminTab();
    await adminOrganization.clickTopMenu('Configuration');
    await adminOrganization.selectDropDownItem('Email Configuration');
    await adminConfiguration.verifySectionHeading('Email Configuration');
    await adminConfiguration.clickMailMethod("SMTP");
    await adminConfiguration.enterSMTPPort("558");
    await adminConfiguration.enterSMTPHost("smtp.mail.com");
    await adminOrganization.clickSaveButton();
});

test('TC_ADMIN_CONFI_004: Attempt to Save with Empty "Mail Sent As', async () => {
    await adminUserManagement.clickAdminTab();
    await adminOrganization.clickTopMenu('Configuration');
    await adminOrganization.selectDropDownItem('Email Configuration');
    await adminConfiguration.verifySectionHeading('Email Configuration');
    await adminConfiguration.enterMailInConfiguration(" ");
    await adminOrganization.clickSaveButton();
});

test('TC_ADMIN_CONFI_005: Test "Send Test Mail" Toggle and Functionality', async () => {
    await adminUserManagement.clickAdminTab();
    await adminOrganization.clickTopMenu('Configuration');
    await adminOrganization.selectDropDownItem('Email Configuration');
    await adminConfiguration.verifySectionHeading('Email Configuration');
    await adminConfiguration.toggleSendTestMailSwitch();
    await adminConfiguration.fillTestEmailAddress("hr.test@example.com");
    await adminOrganization.clickSaveButton();
    await adminConfiguration.verifySuccessToast();
    await adminConfiguration.verifySuccessToastOnSendTestMail();
});

test('TC_ADMIN_CONFI_006: Verify "Reset" Functionality', async () => {
    await adminUserManagement.clickAdminTab();
    await adminOrganization.clickTopMenu('Configuration');
    await adminOrganization.selectDropDownItem('Email Configuration');
    await adminConfiguration.verifySectionHeading('Email Configuration');
    await adminConfiguration.clickResetDefaultButton();
});

test('TC_ADMIN_CONFI_007: Path to Sendmail Field Validation', async () => {
    await adminUserManagement.clickAdminTab();
    await adminOrganization.clickTopMenu('Configuration');
    await adminOrganization.selectDropDownItem('Email Configuration');
    await adminConfiguration.verifySectionHeading('Email Configuration');
    await adminConfiguration.verifyVisibilityOfPathToSendEmail();
});

test('TC_ADMIN_CONFI_008: Verify Navigation to Email Subscriptions', async () => {
    await adminUserManagement.clickAdminTab();
    await adminOrganization.clickTopMenu('Configuration');
    await adminOrganization.selectDropDownItem('Email Subscriptions');
    await adminConfiguration.verifySectionHeading('Email Subscriptions');
});

test('TC_ADMIN_CONFI_009: Toggle Email Subscription ON/OFF', async () => {
    await adminUserManagement.clickAdminTab();
    await adminOrganization.clickTopMenu('Configuration');
    await adminOrganization.selectDropDownItem('Email Subscriptions');
    await adminConfiguration.toggleEmailSubscription('Leave Approvals');
});

test('TC_ADMIN_CONFI_010: Add Subscriber to a Notification Type', async () => {
    await adminUserManagement.clickAdminTab();
    await adminOrganization.clickTopMenu('Configuration');
    await adminOrganization.selectDropDownItem('Email Subscriptions');
    await adminConfiguration.verifySectionHeading('Email Subscriptions');
    const generatedEmail = await adminConfiguration.emailGeneratorUnique();
    await adminConfiguration.addUserToNotificationType('Leave Approvals', 'Test User', generatedEmail);
    await adminConfiguration.verifySuccessToast();
});

test('TC_ADMIN_CONFI_011: Remove Subscriber from a Notification Type', async () => {
    await adminUserManagement.clickAdminTab();
    await adminOrganization.clickTopMenu('Configuration');
    await adminOrganization.selectDropDownItem('Email Subscriptions');
    await adminConfiguration.verifySectionHeading('Email Subscriptions');
    const generatedEmail = await adminConfiguration.emailGeneratorUnique();
    await adminConfiguration.addUserToNotificationType('Leave Approvals', 'Test User', generatedEmail);
    await adminConfiguration.verifySuccessToast();
    await adminConfiguration.deleteButtonByIndex(0);
});

test('TC_ADMIN_CONFI_012: Verify "Records Found" Count', async () => {
    await adminUserManagement.clickAdminTab();
    await adminOrganization.clickTopMenu('Configuration');
    await adminOrganization.selectDropDownItem('Email Subscriptions');
    await adminConfiguration.verifySectionHeading('Email Subscriptions');
    await adminUserManagement.verifyRecordsFoundCount();
});

test('TC_ADMIN_CONFI_013: Verify Navigation to Email Subscriptions', async () => {
    await adminUserManagement.clickAdminTab();
    await adminOrganization.clickTopMenu('Configuration');
    await adminOrganization.selectDropDownItem('Localization');
    await adminConfiguration.verifySectionHeading('Localization');
});

test('TC_ADMIN_CONFI_014: Change Application Language', async () => {
    await adminUserManagement.clickAdminTab();
    await adminOrganization.clickTopMenu('Configuration');
    await adminOrganization.selectDropDownItem('Language Packages');
    await adminConfiguration.clickTranslateIconByIndex(4);
    await adminConfiguration.printLanguageValue();
    await adminOrganization.clickSaveButton();
});

test('TC_ADMIN_CONFI_015: Change Date Format', async () => {
    await adminUserManagement.clickAdminTab();
    await adminOrganization.clickTopMenu('Configuration');
    await adminOrganization.selectDropDownItem('Localization');
    await adminConfiguration.verifySectionHeading('Localization');
    //update Date and day while running
    await adminConfiguration.changeDateFormatOption('D, dd M yyyy ( TUE, 26 Aug 2025 )');
    await adminOrganization.clickSaveButton();
    await adminConfiguration.verifyDateUpdateSuccessToast();
});

test('TC_ADMIN_CONFI_016: Verify Dropdown Options', async () => {
    await adminUserManagement.clickAdminTab();
    await adminOrganization.clickTopMenu('Configuration');
    await adminOrganization.selectDropDownItem('Localization');
    await adminConfiguration.verifySectionHeading('Localization');
    await adminConfiguration.verifyDropdownOptions(1, ['D, dd M yyyy ( Wed, 06 Aug 2025 )', 'yyyy-mm-dd ( 2025-08-06 )']);
    await adminConfiguration.verifyDropdownOptions(0,  ["Chinese (Simplified, China) - 中文（简体，中国）", "Chinese (Traditional, Taiwan) - 中文（繁體，台灣）", "Dutch - Nederlands", "English (United States)", "French - Français", "German - Deutsch", "Spanish (Costa Rica) - Español (Costa Rica)", "Spanish - Español", "Tamil (India) - தமிழ் (இந்தியா)"]);
});

test('TC_ADMIN_CONFI_017: Verify Navigation to Language Packages', async () => {
    await adminUserManagement.clickAdminTab();
    await adminOrganization.clickTopMenu('Configuration');
    await adminOrganization.selectDropDownItem('Language Packages');
    await adminConfiguration.verifySectionHeading('Language Packages');
    await adminJob.verifyRecordsCount();
});

test('TC_ADMIN_CONFI_018: Add a New Language Package', async () => {
    await adminUserManagement.clickAdminTab();
    await adminOrganization.clickTopMenu('Configuration');
    await adminOrganization.selectDropDownItem('Language Packages');
    await adminConfiguration.verifySectionHeading('Language Packages');
    await adminJob.verifyAddButtonFunctionality();
    await adminConfiguration.AddLanguagePackage('English (Canada)');
    await adminOrganization.clickSaveButton();
    await adminConfiguration.verifySuccessToast();
});

test('TC_ADMIN_CONFI_019: Attempt to Add Invalid Language Package File', async () => {
    await adminUserManagement.clickAdminTab();
    await adminOrganization.clickTopMenu('Configuration');
    await adminOrganization.selectDropDownItem('Language Packages');
    await adminConfiguration.clickUploadLanguage();
    await adminConfiguration.clickBrowseLanguageButton();
    await adminConfiguration.fileUpload();
    await adminConfiguration.uploadFileError();
});

test('TC_ADMIN_CONFI_020: Delete a Language Package', async () => {
    await adminUserManagement.clickAdminTab();
    await adminOrganization.clickTopMenu('Configuration');
    await adminOrganization.selectDropDownItem('Language Packages');
    await adminConfiguration.deleteButtonByIndex(3)
});

test('TC_ADMIN_CONFI_021: Download a Language Package', async () => {
    await adminUserManagement.clickAdminTab();
    await adminOrganization.clickTopMenu('Configuration');
    await adminOrganization.selectDropDownItem('Language Packages');
    await adminConfiguration.downloadLanguage();
});

test('TC_ADMIN_CONFI_022: Verify "Translate" Functionality', async () => {
    await adminUserManagement.clickAdminTab();
    await adminOrganization.clickTopMenu('Configuration');
    await adminOrganization.selectDropDownItem('Language Packages');
    await adminConfiguration.clickTranslateIconByIndex(1);
    await adminConfiguration.enterTranslateText("deleteddddddd");
    await adminOrganization.clickSaveButton();
});
test('TC_ADMIN_CONFI_023: Verify Upload (Update) Functionality for Existing Package', async()=>{
    await adminUserManagement.clickAdminTab();
    await adminOrganization.clickTopMenu('Configuration');
    await adminOrganization.selectDropDownItem('Language Packages');
    await adminConfiguration.clickUploadLanguage();
    await adminConfiguration.clickBrowseLanguageButton();
    await adminConfiguration.fileUpload();
});

test('TC_ADMIN_CONFI_024: Verify Navigation to Module Configuration', async()=>{
    await adminUserManagement.clickAdminTab();
    await adminOrganization.clickTopMenu('Configuration');
    await adminOrganization.selectDropDownItem('Modules');
});

test('TC_ADMIN_CONFI_025: Enable/Disable a Single Module', async()=>{
    await adminUserManagement.clickAdminTab();
    await adminOrganization.clickTopMenu('Configuration');
    await adminOrganization.selectDropDownItem('Modules');
    await adminConfiguration.toggleEnable(4)
});
test('TC_ADMIN_CONFI_026: Enable/Disable Multiple Modules', async()=>{
    await adminUserManagement.clickAdminTab();
    await adminOrganization.clickTopMenu('Configuration');
    await adminOrganization.selectDropDownItem('Modules');
    await adminConfiguration.toggleEnable(4)
    await adminConfiguration.toggleEnable(5)
    await adminOrganization.clickSaveButton();
    await adminConfiguration.verifySuccessToast();
});

test('TC_ADMIN_CONFI_027: Verify "Save" Button Without Changes', async()=>{
    await adminUserManagement.clickAdminTab();
    await adminOrganization.clickTopMenu('Configuration');
    await adminOrganization.selectDropDownItem('Modules');
    await adminOrganization.clickSaveButton();
    await adminConfiguration.verifySuccessToast();
});

test('TC_ADMIN_CONFI_028 - Test Critical Module Disabling (Negative)', async () => {
    await adminUserManagement.clickAdminTab();
    await adminOrganization.clickTopMenu('Configuration');
    await adminOrganization.selectDropDownItem('Modules');
    await adminConfiguration.enableToggleIfNeeded(0);
    await adminOrganization.clickSaveButton();
});

test('TC_ADMIN_CONFI_029: Verify Navigation to Social Media Authentication', async () => {
    await adminUserManagement.clickAdminTab();
    await adminOrganization.clickTopMenu('Configuration');
    await adminOrganization.selectDropDownItem('Social Media Authentication');
    await adminConfiguration.verifySectionHeading('Provider List');
});

test('TC_ADMIN_CONFI_032: Verify Navigation to OAuth Client List', async () => {
    await adminUserManagement.clickAdminTab();
    await adminOrganization.clickTopMenu('Configuration');
    await adminOrganization.selectDropDownItem('Register OAuth Client');
    await adminConfiguration.verifySectionHeading('OAuth Client List');
});

test('TC_ADMIN_CONFI_033: Add a Valid OAuth Client', async () => {
    await adminUserManagement.clickAdminTab();
    await adminOrganization.clickTopMenu('Configuration');
    await adminOrganization.selectDropDownItem('Register OAuth Client');
    await adminConfiguration.addClientByValidField();
    await adminOrganization.clickSaveButton();
    await adminConfiguration.verifySuccessToast();
});

test('TC_ADMIN_CONFI_034: Attempt to Add Client with Empty Required Fields', async () => {
    await adminUserManagement.clickAdminTab();
    await adminOrganization.clickTopMenu('Configuration');
    await adminOrganization.selectDropDownItem('Register OAuth Client');
    await adminConfiguration.addClientByEmptyField();
    await adminOrganization.clickSaveButton();
})

test('TC_ADMIN_CONFI_035: Edit an Existing OAuth Client', async () => {
    await adminUserManagement.clickAdminTab();
    await adminOrganization.clickTopMenu('Configuration');
    await adminOrganization.selectDropDownItem('Register OAuth Client');
    console.log("user cannot edit the existing oauth client");
});

test('TC_ADMIN_CONFI_036: Delete an Existing OAuth Client', async () => {
    await adminUserManagement.clickAdminTab();
    await adminOrganization.clickTopMenu('Configuration');
    await adminOrganization.selectDropDownItem('Register OAuth Client');
    console.log("user cannot delete the existing oauth client");
});

test('TC_ADMIN_CONFI_037: Verify Client Status Toggle', async () => {
    await adminUserManagement.clickAdminTab();
    await adminOrganization.clickTopMenu('Configuration');
    await adminOrganization.selectDropDownItem('Register OAuth Client');
    await adminConfiguration.addClientByEmptyField();
    await adminConfiguration.clickClientToggle();
});

test('TC_ADMIN_CONFI_038: Verify Navigation to LDAP Configuration', async () => {
    await adminUserManagement.clickAdminTab();
    await adminOrganization.clickTopMenu('Configuration');
    await adminOrganization.selectDropDownItem('LDAP Configuration');
});

test('TC_ADMIN_CONFI_039: Enable LDAP and Save Valid Basic Settings', async () => {
    await adminUserManagement.clickAdminTab();
    await adminOrganization.clickTopMenu('Configuration');
    await adminOrganization.selectDropDownItem('LDAP Configuration');
    await adminConfiguration.enableToggleButton();
    await adminOrganization.clickSaveButton();
});

test('TC_ADMIN_CONFI_040: Attempt to Save with Empty Required Fields (Host/Port)', async () => {
    await adminUserManagement.clickAdminTab();
    await adminOrganization.clickTopMenu('Configuration');
    await adminOrganization.selectDropDownItem('LDAP Configuration');
    await adminConfiguration.enableToggleButton();
    await adminConfiguration.enterInHostField(" ");
    await adminConfiguration.emptyFieldErrorMessage();
    await adminOrganization.clickSaveButton();
});

test('TC_ADMIN_CONFI_041: Test "Bind Anonymously" Toggle Impact', async () => {
    await adminUserManagement.clickAdminTab();
    await adminOrganization.clickTopMenu('Configuration');
    await adminOrganization.selectDropDownItem('LDAP Configuration');
    // make the toggle ON
    await adminConfiguration.clickBindAnonymouslyToggle();
    // make the toggle off to make the fields visible
    await adminConfiguration.clickBindAnonymouslyToggle();
    await adminConfiguration.verifyDistinguishedNameVisible();// verify the fields are visible
    await adminConfiguration.verifyPasswordVisible();
});

test('TC_ADMIN_CONFI_042: Configure and Save LDAP with Bind Credentials', async () => {
    await adminUserManagement.clickAdminTab();
    await adminOrganization.clickTopMenu('Configuration');
    await adminOrganization.selectDropDownItem('LDAP Configuration');
    await adminConfiguration.enterDistinguishName("secure");
    await adminConfiguration.enterPasswordField("123456");
    await adminConfiguration.enterBaseDistinguishedName("connect");
    await adminOrganization.clickSaveButton();
});

test('TC_ADMIN_CONFI_043: Test Encryption Dropdown Options', async () => {
    await adminUserManagement.clickAdminTab();
    await adminOrganization.clickTopMenu('Configuration');
    await adminOrganization.selectDropDownItem('LDAP Configuration');
    await adminConfiguration.clickEncryptionDropDown();
    await adminConfiguration.clickTLSOption();
    await adminConfiguration.clickEncryptionDropDown();
    await adminConfiguration.clickSSLOption();
    await adminOrganization.clickSaveButton();
});

test('TC_ADMIN_CONFI_044: Test LDAP Implementation Dropdown Options', async () => {
    await adminUserManagement.clickAdminTab();
    await adminOrganization.clickTopMenu('Configuration');
    await adminOrganization.selectDropDownItem('LDAP Configuration');
    await adminConfiguration.selectLdapImplementation('MS Active Directory');
 
});

test('TC_ADMIN_CONFI_045: Disable LDAP and ensure settings are saved and LDAP login is no longer enforced.s', async () => {
    await adminUserManagement.clickAdminTab();
    await adminOrganization.clickTopMenu('Configuration');
    await adminOrganization.selectDropDownItem('Modules');
});

test('TC_ADMIN_CONFI_030: Enable/Disable a Social Media Provider', async () => {
    await adminUserManagement.clickAdminTab();
    await adminOrganization.clickTopMenu('Configuration');
    await adminOrganization.selectDropDownItem('Social Media Authentication');
    await adminConfiguration.clickAddButton();
    await adminConfiguration.enterName("instagram");
    await adminConfiguration.ProviderUrl("instagram.com");
    await adminConfiguration.clientId("123456");
    await adminConfiguration.clientSecret("123456");
    await adminConfiguration.saveButton();
    await adminOrganization.clickTopMenu('Configuration');
    await adminOrganization.selectDropDownItem('Social Media Authentication');
    console.log('There is no toggle');
});

test('TC_ADMIN_CONFI_031:Configure API Keys for a Provider', async () => {
    await adminUserManagement.clickAdminTab();
    await adminOrganization.clickTopMenu('Configuration');
    await adminOrganization.selectDropDownItem('Social Media Authentication');
    await adminConfiguration.clickAddButton();
    await adminConfiguration.enterName("instagram");
    await adminConfiguration.ProviderUrl("instagram.com");
    await adminConfiguration.clientId("123456");
    await adminConfiguration.clientSecret("123456");
    await adminConfiguration.saveButton();
});