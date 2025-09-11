const { expect } = require('@playwright/test');


class PIMReportsPage {
    constructor(page) {
        this.page = page;
        this.Search = this.page.getByRole('textbox', { name: 'Type for hints...' });
        this.clickOpt = this.page.getByRole('option', { name: 'PIM Sample Report' }).locator('span');
        this.errorMessage = this.page.locator('.oxd-text.oxd-text--span.oxd-input-field-error-message.oxd-input-group__message');
        this.addBtn = this.page. getByRole('button', { name: ' Add ' });
        this.reportName = this.page.getByPlaceholder('Type here ...')
    }
        
    async search(name) {
        await this.Search.fill(name);
    }

    async clickOnopt() {
        await this.clickOpt.click();
    }

    async clickOnReports(){
        await this.page.getByRole('link', { name: 'Reports' }).click();
    }

    async clickNameDropDown(){
        await this.page.getByRole('columnheader', { name: 'Name ' }).locator('i').first().click();
    }

     async sortReportsByName(order) {
        await this.page.getByRole('menu').getByText(order).click();
    }

    async clickOnAddBtn(){
        await this.addBtn.click();
    }

    async enterReportName(name){
        await this.reportName.fill(name)
    }

    async verifyErrorMessage() {
        await expect(this.errorMessage).toBeVisible();
    }

    async clickOnAddBtn(){
        await this.addBtn.click();
    }

    async enterReportName(name){
        await this.reportName.fill(name)
    }
}

module.exports = { PIMReportsPage };