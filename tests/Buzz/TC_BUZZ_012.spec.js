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

test('TC_BUZZ_012: Post Comment With Empty Text', async () => {
    await buzz.clickBuzzTab();
    await buzz.verifyBuzzPage();
    await buzz.clickCommentIcon();
    const commentsBefore = await buzz.getCommentCount();
    console.log('Before comments:', commentsBefore);
    await buzz.clickCommentBox();
    await buzz.enterCommentText('');
    await buzz.submitComment();
    const commentsAfter = await buzz.getCommentCount();
    expect(commentsAfter).toBe(commentsBefore);
    console.log('After comments:', commentsAfter);
});

