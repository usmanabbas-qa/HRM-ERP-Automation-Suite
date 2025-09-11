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

test('TC_BUZZ_013: Verify Recent Posts on Top', async () => {
    await buzz.clickBuzzTab();
    await buzz.verifyBuzzPage();
    await buzz.enterPostText("Create post text");
    await buzz.clickPostButton();
    await buzz.verifySuccessToast("Successfully Saved");
    await buzz.verifyRecentPost("Create post text");
});

