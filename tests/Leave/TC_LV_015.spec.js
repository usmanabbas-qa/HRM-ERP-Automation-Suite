import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage.js';
import { LeavePage } from '../../pages/Leave.js';
import { MyInfoPage } from '../../pages/MyInfo.js';

let login;
let leave;
let myInfo;

test.beforeEach(async ({ page }) => {
    login = new LoginPage(page);
    leave = new LeavePage(page);
    myInfo = new MyInfoPage(page);
    await login.navigate();
    await login.verifySuccessfulllogin();
});

test('TC_LV_015 - Add Entitlement for Individual Employee (Positive)', async () => {
    await leave.clickleaveTab();
    await leave.verifyleavePage();
    await leave.entitlementPageNavigation();
    await leave.positiveEntitlement('2');
    await leave.savingButton();
});