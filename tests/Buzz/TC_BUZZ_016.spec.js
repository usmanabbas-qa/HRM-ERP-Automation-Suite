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

test('TC_BUZZ_016: Verify Delete Post Option Visible for Admin on Own Post', async () => {
    await buzz.clickBuzzTab();
    await buzz.verifyBuzzPage();
    await buzz.enterPostText("Test post to check delete button visibility");
    await buzz.clickPostButton();
    await buzz.verifySuccessToast("Successfully Saved");
    await buzz.deleteLatestPost();
});
