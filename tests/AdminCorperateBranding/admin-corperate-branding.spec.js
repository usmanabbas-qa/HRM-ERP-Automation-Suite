import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage.js';
import { AdminCorporateBrandingPage } from '../../pages/AdminCorporateBranding.js';
import { AdminUserManagementPage } from '../../pages/AdminUserManagement.js';
import { AdminOrganizationPage } from '../../pages/AdminOrganization.js';

let login;
let adminOrganization;
let admincorporatebrandingpage;
let adminUserManagement;

test.beforeEach(async ({ page }) => {
    login = new LoginPage(page);
    admincorporatebrandingpage = new AdminCorporateBrandingPage(page);
    adminUserManagement = new AdminUserManagementPage(page);
    adminOrganization = new AdminOrganizationPage(page);
    await login.navigate();
    await login.verifySuccessfulllogin();
});

test('TC_ADMIN_CB_001: Verify Navigation to Corporate Branding Module ', async () => {
    await adminUserManagement.clickAdminTab();
    await adminOrganization.clickTopMenu('Corporate Branding');
    await admincorporatebrandingpage.assertCorporateBranndinPage();
})

test('TC_ADMIN_CB_002: Update Primary Color ', async () => {
    await adminUserManagement.clickAdminTab();
    await adminOrganization.clickTopMenu('Corporate Branding');
    await admincorporatebrandingpage.enterColorByIndex(0, '#33a3ffff');
    await admincorporatebrandingpage.clickPublishButton();
});

test('TC_ADMIN_CB_003: Upload Valid Client Logo', async () => {
    await adminUserManagement.clickAdminTab();
    await adminOrganization.clickTopMenu('Corporate Branding');
    await admincorporatebrandingpage.verifyLogoUpload();
    await admincorporatebrandingpage.clickPublishButton();
});

test('TC_ADMIN_CB_004: Upload Invalid Client Logo - Wrong File Type', async () => {
    await adminUserManagement.clickAdminTab();
    await adminOrganization.clickTopMenu('Corporate Branding');
    await admincorporatebrandingpage.uploadLogoInTextFormatFileType();
    await admincorporatebrandingpage.clickPublishButton();
    console.log(" on uploading text file , 'publish ' button is not working ");
});

test('TC_ADMIN_CB_005: Upload Invalid Client Logo - Exceeding File Size', async () => {
    await adminUserManagement.clickAdminTab();
    await adminOrganization.clickTopMenu('Corporate Branding');
    await admincorporatebrandingpage.uploadInvalidLogo();
    await admincorporatebrandingpage.clickPublishButton();
});

test('TC_ADMIN_CB_006  :Upload Invalid Client Logo - Incorrect Dimensions', async () => {
    await adminUserManagement.clickAdminTab();
    await adminOrganization.clickTopMenu('Corporate Branding');
    await admincorporatebrandingpage.uploadLogoWithIncorrectDimensions();
    await admincorporatebrandingpage.clickPublishButton();
});

test('TC_ADMIN_CB_007  :Test "Reset to Default" Functionality', async () => {
    await adminUserManagement.clickAdminTab();
    await adminOrganization.clickTopMenu('Corporate Branding');
    await admincorporatebrandingpage.uploadLogoWithIncorrectDimensions();
    await admincorporatebrandingpage.clickResetDefaultButton();
});

test('TC_ADMIN_CB_008  :Test "Preview" Functionality', async () => {
    await adminUserManagement.clickAdminTab();
    await adminOrganization.clickTopMenu('Corporate Branding');
    await admincorporatebrandingpage.uploadLogoWithIncorrectDimensions();
    await admincorporatebrandingpage.clickPreviewButton();
});

test('TC_ADMIN_CB_009: Toggle Social Media Images ON/OFF', async () => {
    await adminUserManagement.clickAdminTab();
    await adminOrganization.clickTopMenu('Corporate Branding');
    await admincorporatebrandingpage.toggleSocialImages()
});

test('TC_ADMIN_CB_010: Publish Changes with Required Fields Missing', async () => {
    await adminUserManagement.clickAdminTab();
    await adminOrganization.clickTopMenu('Corporate Branding');
    await admincorporatebrandingpage.clickPublishButton();
    console.log(" on clicking 'publish' button , it is not working as required fields are missing ");
});

test('TC_ADMIN_CB_011: Update All Color Options and Publish', async () => {
    await adminUserManagement.clickAdminTab();
    await adminOrganization.clickTopMenu('Corporate Branding');
    await admincorporatebrandingpage.enterColorByIndex(0, '#33a3ffff');
    await admincorporatebrandingpage.enterColorByIndex(1, '#7c4e4eff');
    await admincorporatebrandingpage.clickPublishButton();
});

test('TC_ADMIN_CB_012: Verify No File Selected State', async () => {
    await adminUserManagement.clickAdminTab();
    await adminOrganization.clickTopMenu('Corporate Branding');
    await admincorporatebrandingpage.verifyNoFileSelectedVisibility();
});

test('TC_ADMIN_CB_013: Upload Valid Client Banner', async () => {
    await adminUserManagement.clickAdminTab();
    await adminOrganization.clickTopMenu('Corporate Branding');
    await admincorporatebrandingpage.verifyClientBrandLogoUpload();
    await admincorporatebrandingpage.clickPublishButton();
});

test('TC_ADMIN_CB_014: Upload Valid Login Banner', async () => {
    await adminUserManagement.clickAdminTab();
    await adminOrganization.clickTopMenu('Corporate Branding');
    await admincorporatebrandingpage.verifyLoginBannerUpload();
    await admincorporatebrandingpage.clickPublishButton();
});

test('TC_ADMIN_CB_015: Verify Page Load Time & Responsiveness', async () => {
    await adminUserManagement.clickAdminTab();
    await adminOrganization.clickTopMenu('Corporate Branding');
    const startTime = performance.now();
    await admincorporatebrandingpage.assertCorporateBranndinPage();
    const endTime = performance.now();
    const loadTime = endTime - startTime;
    console.log(`Page Load Time: ${loadTime} ms`);
    expect(loadTime).toBeLessThan(2000); // Example threshold of 2 seconds
});

test('TC_ADMIN_CB_016: Attempt to Save Without Changes', async () => {
    await adminUserManagement.clickAdminTab();
    await adminOrganization.clickTopMenu('Corporate Branding');
    await admincorporatebrandingpage.clickPublishButton();
});

test('TC_ADMIN_CB_020: Verify Accessibility of Controls (Keyboard Navigation)', async () => {
    await adminUserManagement.clickAdminTab();
    await adminOrganization.clickTopMenu('Corporate Branding');
    await admincorporatebrandingpage.navigateBrandingPageWithTab();
    await expect(admincorporatebrandingpage.publishBtn).toBeVisible();
});

test('TC_ADMIN_CB_017: Verify Color Picker Functionality (if applicable)', async()=>{
    await adminUserManagement.clickAdminTab();
    await adminOrganization.clickTopMenu('Corporate Branding');
    await admincorporatebrandingpage.enterColorByIndex(0, '#33a3ffff');
    await admincorporatebrandingpage.enterColorByIndex(1, '#7c4e4eff');
    await admincorporatebrandingpage.enterColorByIndex(2, '#b32c2c');
});

test('TC_ADMIN_CB_018: Verify Image Upload Field Clear/Remove Functionality (if exists)', async()=>{
    await adminUserManagement.clickAdminTab();
    await adminOrganization.clickTopMenu('Corporate Branding');
    //functionality doesn't exist
});

test('TC_ADMIN_CB_019: Verify Consistency of Branding After Publish', async () => {
    await adminUserManagement.clickAdminTab();
    await adminOrganization.clickTopMenu('Corporate Branding');
    await admincorporatebrandingpage.assertCorporateBranndinPage();
});
