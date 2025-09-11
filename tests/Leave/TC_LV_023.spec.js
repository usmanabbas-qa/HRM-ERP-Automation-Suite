import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage.js';
import { LeavePage } from '../../pages/Leave.js';
import { TimePage } from '../../pages/Time.js';

let login;
let leave;
let time;

test.beforeEach(async ({ page }) => {
    login = new LoginPage(page);
    leave = new LeavePage(page);
    time = new TimePage(page);
    await login.navigate();
    await login.verifySuccessfulllogin();
});

test('TC_LV_023 - Edit an existing ""My Entitlement""', async () => {
    await leave.clickleaveTab();
    await leave.verifyleavePage();
    await time.clickTopMenu('Entitlements');
    await time.selectDropDownItem('My Entitlements');
    await time.clickAddButton();
    await leave.addEntittlement('Qwerty Qwerty LName');
    await leave.dropDownLeaveType('CAN - Bereavement');
    await leave.positiveEntitlement('2');
    await leave.savingButton();
});