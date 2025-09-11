import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage.js';
import { PerformancePage } from '../../pages/Performance.js';
import { AdminEducationPage } from '../../pages/AdminEducation.js';
import { MyInfoPage } from '../../pages/MyInfo.js';


let login;
let performance;
let adminEducation
let myInfo;

test.beforeEach(async ({ page }) => {
    login = new LoginPage(page);
    performance = new PerformancePage(page);
    adminEducation = new AdminEducationPage(page);
    myInfo = new MyInfoPage(page);
    await login.navigate();
    await login.verifySuccessfulllogin();
});

test('TC_INFO_017:  Add New Dependent (Positive)', async () => {
    await myInfo.clickMyInfoTab();
    await myInfo.openDependents();
    await myInfo.addDependent('sam', 'Child', '2021-12-15');
    await myInfo.editDependent('Other', 'sister');// not required here but added for completeness
    await myInfo.deleteDependent();
});
 
