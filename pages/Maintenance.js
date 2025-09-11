const { expect } = require('@playwright/test');

class MaintenancePage {
    constructor(page) {
        this.page = page;
        this.maintenanceTab = this.page.locator("[href*='viewMaintenanceModule']");
        this.assertmaintenancePage = this.page.locator(".oxd-text.oxd-text--h6.oxd-topbar-header-breadcrumb-module")
        this.adminVerify = this.page.locator(".oxd-text.oxd-text--h6.orangehrm-admin-access-title");
        this.inputPass = this.page.locator("input[name='password']");
        this.clickConfirmBtn = this.page.locator("button[type='submit']");
        this.confirmButton = page.getByRole('button', { name: 'Confirm' });
        this.cancelButton = page.getByRole('button', { name: 'Cancel' });
        this.adminPasswordInput = page.locator('input[name="password"]');
        this.topbarMenu = page.getByLabel('Topbar Menu');
        this.employeeRecordsMenu = page.getByRole('listitem').filter({ hasText: /^Employee Records$/ });
        this.candidateRecordsMenu = page.getByRole('listitem').filter({ hasText: /^Candidate Records$/ });
        this.purgeRecordsHeading = page.getByRole('heading', { name: '/ Purge Records' });
        this.purgeRecord = this.topbarMenu.getByText('Purge Records');
        this.errormsg = this.page.getByText('Required', { exact: true });
        this.pastEmployeeField = this.page.locator('input[placeholder="Type for hints..."]');
    }


    async clickmaintenanceTab() {
        await this.maintenanceTab.click();
    }
    async verifyAdmin() {
        await expect(this.adminVerify).toContainText('Administrator Access')
    }
    async enterPassword(password) {
        await this.inputPass.fill(password)
    }
    async clickConfirm() {
        await this.clickConfirmBtn.click();
    }
    async verifymaintenancePage() {
        await expect(this.assertmaintenancePage).toHaveText('Maintenance');
    }
  
    async enterMaintenancePassword(password) {
    await this.adminPasswordInput.fill(password);
  }

  async clickConfirm() {
    await this.confirmButton.click();
  }

  async clickCancel() {
    await this.cancelButton.click();
  }

  async verifyPurgeRecordsVisible() {
    await expect(this.purgeRecord).toBeVisible();
  }

  async selectEmployeeRecords() {
    await this.topbarMenu.locator('span i').click();
    await this.employeeRecordsMenu.click();
  }

  async selectCandidateRecords() {
    await this.topbarMenu.locator('span i').click();
    await this.candidateRecordsMenu.click();
  }

  async verifyPurgeRecordsHeading() {
    await expect(this.purgeRecordsHeading).toBeVisible();
  }

  async errorMessage(){
    await expect(this.errormsg).toBeVisible();
  }
  async verifyVisibilityOfButton(){
    await expect(this.cancelButton).toBeVisible();
  }
  
  async verifyUserNameVisibilty(){
    await expect(this.inputPass).toBeVisible();
  }
  async vefiryConfirmButtonVisibility(){
    await expect(this.confirmButton).toBeVisible();
  }

    async verifyTabs() {
        await expect(this.page.getByRole('button', { name: 'Upgrade' })).toBeVisible();
        await expect(this.page.getByRole('button', { name: '' })).toBeVisible();
        await expect(this.page.getByRole('link', { name: 'client brand banner' })).toBeVisible();
    }

    async verifySidesTabs() {
        await expect(this.page.getByLabel('Sidepanel').locator('div').filter({ hasText: 'AdminPIMLeaveTimeRecruitmentMy' })).toBeVisible();
    }

    async verifyPurgeNavigation() {
        await expect(this.page.getByRole('listitem').filter({ hasText: 'Purge Records' })).toBeVisible();
    }

    async clickAccessRecords() {
        await this.page.getByRole('listitem').filter({ hasText: 'Access Records' }).click();
    }

    async enterPastEmployeeName(name) {
        await this.pastEmployeeField.fill(name);
    }

    async searchRecord(record) {
        await this.page.getByRole('textbox', { name: 'Type for hints...' }).fill(record);
    }

    async purgeAll() {
      await this.page.getByRole('button', { name: 'Purge All' }).isVisible();
    }
}

module.exports = { MaintenancePage }