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

test('TC_BUZZ_010: Verify Comment on Post', async () => {
    await buzz.clickBuzzTab();
    await buzz.verifyBuzzPage();
    await buzz.clickCommentIcon();
    await buzz.clickCommentBox();
    await buzz.enterCommentText('congrats!!');
    await buzz.submitComment();
    await buzz.verifySuccessToast("Successfully Saved");
});
