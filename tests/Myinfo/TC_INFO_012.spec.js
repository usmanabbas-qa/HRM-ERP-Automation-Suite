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

test('TC_MyInfo_012:  Attempt to Save with Invalid Email Format', async () => {
    await myInfo.clickMyInfoTab();
    await myInfo.verifyMyInfoPage();
    await myInfo.clickNavbarItem("Contact Details");
    await myInfo.enterInputByIndex(10, "ablert@gmail");
    await myInfo.invalidEmailError();
});