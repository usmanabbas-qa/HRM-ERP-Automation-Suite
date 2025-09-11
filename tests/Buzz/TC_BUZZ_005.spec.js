import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage.js';
import { BuzzPage } from '../../pages/Buzz.js';

let login;
let buzz;

test.beforeEach(async ({ page }) => {
    login = new LoginPage(page);
    buzz = new BuzzPage(page);
    await login.navigate();
    await login.verifySuccessfulllogin();
});

test('TC_BUZZ_005: verify by entering special characters', async () => {
    await buzz.clickBuzzTab();
    await buzz.verifyBuzzPage();
    await buzz.createPostText("*/$#");
    await buzz.clickOnPostButton();
    await buzz.verifySuccessToast("Successfully Saved");
});