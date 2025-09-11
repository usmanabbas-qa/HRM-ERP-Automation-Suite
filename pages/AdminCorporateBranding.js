const { expect } = require('@playwright/test');

class AdminCorporateBrandingPage {
  constructor(page) {
    this.page = page;
    this.CorporateBranding = this.page.locator("//a[normalize-space()='Corporate Branding']");
    this.colorBoxes = this.page.locator('.oxd-color-input.oxd-color-input--active');
    this.inputFields = this.page.locator('.oxd-input.oxd-input--active');
    this.publishButton = this.page.getByText('Publish', { exact: true });
    this.wrongFileErrorMsg = this.page.locator('span.oxd-input-field-error-message');
    this.resetDefaultButton = this.page.getByText('Reset to Default', { exact: true });
    this.previewDefaultButton = this.page.getByText(' Preview ', { exact: true });
    this.socialImagesToggle = this.page.locator('.oxd-switch-input.oxd-switch-input--active.--label-right')
    this.noFileSelectedText = this.page.locator('.oxd-file-input-div');
    this.primaryColorInput = page.locator('.oxd-color-input').nth(0);
    this.secondaryColorInput = page.locator('.oxd-color-input').nth(1);
    this.clientLogoButton = page.getByText('Client Logo').getByRole('button');
    this.clientBannerButton = page.getByText('Client Banner').getByRole('button');
    this.loginBannerButton = page.getByText('Login Banner').getByRole('button');
    this.resetBtn = page.getByRole('button', { name: 'Reset to Default' });
    this.previewBtn = page.getByRole('button', { name: 'Preview' });
    this.publishBtn = page.getByRole('button', { name: 'Publish' });
  }

  async clickCorporateBranding() {
    await this.CorporateBranding.click();
  }

  async assertCorporateBranndinPage() {
    await expect(this.CorporateBranding).toHaveText('Corporate Branding')
  }

  async enterColorByIndex(index, colorValue) {
    await this.colorBoxes.nth(index).click();
    await this.inputFields.nth(index).fill(colorValue);
  }

  async clickPublishButton() {
    await this.publishButton.click();
  }

  async verifyLogoUpload() {
    const path = require('path');
    const filePath = path.resolve(__dirname, '../test-data/logo.png');
    await this.page.setInputFiles('input[type="file"]', filePath);
  }

  async uploadLogoInTextFormatFileType() {
    const path = require('path');
    const filePath = path.resolve(__dirname, '../test-data/Contourtrainee.txt');
    await this.page.setInputFiles('input[type="file"]', filePath);
  }

  async uploadInvalidLogo() {
    const path = require('path');
    const filePath = path.resolve(__dirname, '../test-data/Invalid Image logo-exceeding 5 MB.jpg');
    await this.page.setInputFiles('input[type="file"]', filePath);
  }

  async uploadLogoWithIncorrectDimensions() {
    const path = require('path');
    const filePath = path.resolve(__dirname, '../test-data/invaliDimension.png');
    await this.page.setInputFiles('input[type="file"]', filePath);
  }

  async clickResetDefaultButton() {
    await this.resetDefaultButton.click();
    console.log(" Everything is Reset TO Defaults");
  }

  async clickPreviewButton() {
    await this.previewDefaultButton.click();
  }

  async toggleSocialImages() {
    await this.socialImagesToggle.click();
  }
  
  async verifyNoFileSelectedVisibility() {
    
    const elementCount = await this.noFileSelectedText.count();

    for (let i = 0; i < elementCount; i++) {
      await expect(elements.nth(i)).toBeVisible();
    }
  }

    async verifyClientBrandLogoUpload() {
    const path = require('path');
    const filePath = path.resolve(__dirname, '../test-data/brand.png');
    const fileInputs = this.page.locator('input[type="file"]');
    await fileInputs.nth(1).setInputFiles(filePath);
  }

  async verifyLoginBannerUpload() {
    const path = require('path');
    const filePath = path.resolve(__dirname, '../test-data/LoginBanner.png');
    const fileInputs = this.page.locator('input[type="file"]');
    await fileInputs.nth(2).setInputFiles(filePath);
  }

  async verifyNoFileSelectedVisibility() {
    
    const elementCount = await this.noFileSelectedText.count();

    for (let i = 0; i < elementCount; i++) {
      await expect(elements.nth(i)).toBeVisible();
    }
  }
   async navigateBrandingPageWithTab() {
    const steps = [
      this.primaryColorInput,
      this.secondaryColorInput,
      this.clientLogoButton,
      this.clientBannerButton,
      this.loginBannerButton,
      this.resetBtn,
      this.previewBtn,
      this.publishBtn,
      this.footerLink,
    ];

    for (const locator of steps) {
      await this.page.keyboard.press('Tab');
    }
  }

  async assertBrandingPageLoaded() {
    await this.page.waitForURL(/.*addTheme/);
    await this.page.waitForSelector('.oxd-color-input');
  }  
}
module.exports = { AdminCorporateBrandingPage };