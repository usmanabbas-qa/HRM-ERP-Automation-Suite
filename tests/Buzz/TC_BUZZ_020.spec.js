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

test('TC_BUZZ_020: Refresh Page Behavior', async ({page}) => {
    await buzz.clickBuzzTab();
    await buzz.verifyBuzzPage();
    await page.reload();
    await buzz.verifyBuzzPage();
});
