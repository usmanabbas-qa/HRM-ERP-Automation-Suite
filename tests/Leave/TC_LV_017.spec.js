import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage.js';
import { LeavePage } from '../../pages/Leave.js';

let login;
let leave;

test.beforeEach(async ({ page }) => {
    login = new LoginPage(page);
    leave = new LeavePage(page);
    await login.navigate();
    await login.verifySuccessfulllogin();
});

test('TC_LV_017 - Add Entitlement for Individual Employee (Zero Entitlement)', async () => {
    await leave.clickleaveTab();
    await leave.verifyleavePage();
    await leave.entitlementPageNavigation();
    await leave.positiveEntitlement('0');
});