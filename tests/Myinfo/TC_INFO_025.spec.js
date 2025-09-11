import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage.js';
import { PIMEmployeeListPage } from '../../pages/PIMEmployeeList.js';
import { AdminOrganizationPage } from '../../pages/AdminOrganization.js';
import { PIMAddEmplyeePage } from '../../pages/PIMAddEmployee.js';
import { MyInfoPage } from '../../pages/MyInfo.js';

let login;
let pimEmployeeList;
let adminOrganization;
let pimAddEmplyee;
let myInfo;

test.beforeEach(async ({ page }) => {
    login = new LoginPage(page);
    pimEmployeeList = new PIMEmployeeListPage(page);
    adminOrganization = new AdminOrganizationPage(page);
    pimAddEmplyee = new PIMAddEmplyeePage(page);  
    myInfo = new MyInfoPage(page);
    await login.navigate();
    await login.verifySuccessfulllogin();
});

test('TC_INFO_025:Add Salary Component with Zero Amount (Negative)', async()=>{
    await pimEmployeeList.clickPIMTab();
    await pimEmployeeList.searchEmployeeByPartialName('John');
    await adminOrganization.clickSearchButton();
    await myInfo.clickEdit();
    await myInfo.clickSalaryTab();
    await myInfo.clicEmergencyContactAddButton();
    await myInfo.salaryComponent('salary');
    await myInfo.selectCurrency('Afghanistan Afghani');
    await myInfo.enterAmount('-11111');
    await myInfo.errorOnNegativeAmount();
});