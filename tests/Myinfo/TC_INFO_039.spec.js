import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage.js';
import { MyInfoPage } from '../../pages/MyInfo.js';

let login;
let myInfo;

test.beforeEach(async ({ page }) => {
    login = new LoginPage(page);
    myInfo = new MyInfoPage(page);
    await login.navigate();
    await login.verifySuccessfulllogin();
});

test("TC_INFO_039 -  Verify 'Save' button enables/disables correctly", async () => {
    await myInfo.clickMyInfoTab();
    await myInfo.verifyMyInfoPage();
    await myInfo.clicksaveButton();
});

