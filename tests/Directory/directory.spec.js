import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage.js';
import { DirectoryPage } from '../../pages/Directory.js';

let login;
let directory;

test.beforeEach(async ({ page }) => {
    login = new LoginPage(page);
    directory = new DirectoryPage(page);
    await login.navigate();
    await login.verifySuccessfulllogin();
});

test('TC_Directory_001: Verify Apply directory page loads correctly', async () => {
    await directory.clickdirectoryTab();
    await directory.verifydirectoryPage();
});