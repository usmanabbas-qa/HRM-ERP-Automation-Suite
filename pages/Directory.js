const { expect } = require('@playwright/test');

class DirectoryPage{
    constructor(page) {
        this.page = page;
        this.directoryTab = this.page.locator("[href*='viewDirectory']");
        this.assertdirectoryPage = this.page.locator(".oxd-text.oxd-text--h6.oxd-topbar-header-breadcrumb-module")
    }

    async clickdirectoryTab() {
        await this.directoryTab.click();
    }
    async verifydirectoryPage(){
        await expect(this.assertdirectoryPage).toHaveText('Directory');
    }

    async selectJobTitle(text){
        await this.page.locator('form i').first().click();
        await this.page.getByRole('option', { name: text}).click();
    }

    async selectLocation(text){
        await this.page.locator('form i').nth(1).click();
        await this.page.getByRole('option', { name: text}).click();
    }

    async verifyDropDownOptions(){
        await this.page.locator('form i').first().click();
        await this.page.locator('form i').nth(1).click();
    }

    async clickEmployeeCard(){
        await this.page.locator('.oxd-sheet').first().click();
    }
}

module.exports = { DirectoryPage }