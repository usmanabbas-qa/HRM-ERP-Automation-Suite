import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage.js';
import { LeavePage } from '../../pages/Leave.js';
import { AdminOrganizationPage } from '../../pages/AdminOrganization.js';
import { AdminConfigurationPage } from '../../pages/AdminConfigurations.js';
import { AdminEducationPage } from '../../pages/AdminEducation.js';

let login;
let leave;
let adminConfiguration;
let adminOrganization;
let adminEducation;

test.beforeEach(async ({ page }) => {
    login = new LoginPage(page);
    leave = new LeavePage(page);
    adminOrganization = new AdminOrganizationPage(page);
    adminEducation = new AdminEducationPage(page);
    adminConfiguration = new AdminConfigurationPage(page);
    await login.navigate();
    await login.verifySuccessfulllogin();
});

test('TC_LV_041 - Verify ""Leave Period"" configuration page loads correctly', async () => {
    await leave.clickleaveTab();
    await leave.verifyleavePage();
    await adminOrganization.clickTopMenu("Configure");
    await adminOrganization.selectDropDownItem("Leave Period");
    await adminConfiguration.verifySectionHeading('Leave Period');

});