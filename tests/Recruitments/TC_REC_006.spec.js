import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage.js';
import { RecruitmentPage } from '../../pages/Recruitment.js';

let login;
let recruitment;

test.beforeEach(async ({ page }) => {
    login = new LoginPage(page);
    recruitment = new RecruitmentPage(page);
    await login.navigate();
    await login.verifySuccessfulllogin();
});

test('TC_REC_006:   Edit Existing Vacancy (Positive)', async () => {
    await recruitment.clickRecruitmentTab();
    await recruitment.verifyRecruitmentPage();
    await recruitment.clickEditVacancy();   
    await recruitment.clickEditToggle();
    await recruitment.enterLastName("ferrari");
    await recruitment.clickSaveButton();
});