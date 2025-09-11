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

test('TC_REC_005:  Add New Vacancy with Missing Required Field (Negative)', async () => {
    await recruitment.clickRecruitmentTab();
    await recruitment.verifyRecruitmentPage();
    await recruitment.clickAddbutton();
    await recruitment.enterFirstName("Driver");
    await recruitment.selectVacancyDropDown("Payroll Administrator");
    await recruitment.enterLastName("ferrari");
    await recruitment.clickSaveButton();
    await recruitment.emailFieldError();
});