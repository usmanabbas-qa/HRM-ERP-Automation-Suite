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

test('TC_BUZZ_004: Verify Empty Post Not Allowed', async () => {
    await buzz.clickBuzzTab();
    await buzz.verifyBuzzPage();

    const latestPost = buzz.latestPost.first();
    let latestPostBefore = "";
    if (await latestPost.isVisible()) {
        latestPostBefore = await latestPost.innerText();
    }

    await buzz.enterPostText("");
    await buzz.clickPostButton();
    await buzz.page.waitForTimeout(2000);

    let latestPostAfter = "";
    if (await latestPost.isVisible()) {
        latestPostAfter = await latestPost.innerText();
    }

    expect(latestPostAfter.trim()).toBe(latestPostBefore.trim());
    await expect(buzz.saveSuccessToast).not.toBeVisible({ timeout: 3000 });
});
