import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage.js';
import { AdminOrganizationPage } from '../../pages/AdminOrganization.js';
import { PIMEmployeeListPage } from '../../pages/PIMEmployeeList.js';
import { PIMAddEmplyeePage } from '../../pages/PIMAddEmployee.js';
import { AdminNationalityPage } from '../../pages/AdminNationality.js';

let login;
let adminOrganization;
let pimEmployeeList;
let pimAddEmplyee;
let adminNationality;


test.beforeEach(async ({ page }) => {
    login = new LoginPage(page);
    adminOrganization = new AdminOrganizationPage(page);
    pimEmployeeList = new PIMEmployeeListPage(page);
    pimAddEmplyee = new PIMAddEmplyeePage(page);
    adminNationality = new AdminNationalityPage(page);
    await login.navigate();
    await login.verifySuccessfulllogin();
});

test('TC_PIM_AE_009: Attempt to Upload Invalid Profile Picture - Exceeding File Size', async () => {
    await pimEmployeeList.clickPIMTab();
    await adminOrganization.clickTopMenu('Add Employee');
    await pimAddEmplyee.verifyAddEmplyeePage();
    await pimAddEmplyee.enterNameField('First Name', 'salma');
    await pimAddEmplyee.enterLastName('Last Name', 'Ghula');
    await pimAddEmplyee.uploadInvalidImage();
    await adminNationality.clickSave();
});