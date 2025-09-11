import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage.js';
import { PerformancePage } from '../../pages/Performance.js';
import { MyInfoPage } from '../../pages/MyInfo.js';


let login;
let performance;
let myInfo;

test.beforeEach(async ({ page }) => {
    login = new LoginPage(page);
    performance = new PerformancePage(page);
    myInfo = new MyInfoPage(page);
    await login.navigate();
    await login.verifySuccessfulllogin();
});

test('TC_INFO_018: Add New Immigration Record (Passport)', async () => {
    await myInfo.clickMyInfoTab();
    await myInfo.navigateToImmigration();
    await myInfo.clickOnAddButton();
    await myInfo.enterPassportNumber('83874');
    await myInfo.selectDate(0, '2021-01-14'); 
    await myInfo.selectDate(1, '2027-11-18'); 
    await myInfo.enterEligibleStatus('on');
    await myInfo.selectNationality('United States');
    await myInfo.selectDate(3, '2015-05-15');
    await myInfo.enterComment('this is added');
    await myInfo.clickSave();
})

