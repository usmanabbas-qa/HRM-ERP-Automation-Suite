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

test('TC_BUZZ_009: Verify Unlike Behavior', async () => {
    await buzz.clickBuzzTab();
    await buzz.verifyBuzzPage();
    await buzz.clickLikeButton();
    await buzz.verifyLikeButtonFunctionality();
    await buzz.clickLikeButton();
    await buzz.verifyDisLikeButtonFunctionality();
});