const { expect } = require('@playwright/test');

class AdminConfigurationPage {
    constructor(page) {
        this.page = page;
        this.mailSentAsField = this.page.locator("(//input[@class='oxd-input oxd-input--active'])[2]");
        this.SMTPPort = this.page.locator("body > div:nth-child(3) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > form:nth-child(3) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > input:nth-child(1)");
        this.SMTPHost = this.page.locator("(//input[@class='oxd-input oxd-input--active'])[3]");
        this.sendTestMailToggle = this.page.locator('span.oxd-switch-input').nth(1);
        this.TestEmailAddressField = this.page.locator('.oxd-input-group:has-text("Test Email Address") input.oxd-input');
        this.testMailSuccessToast = this.page.getByText('SuccessTest Email Sent', { exact: true });
        this.saveSuccessToast = this.page.getByText('SuccessSuccessfully Saved', { exact: true });
        this.resetDefaultButton = this.page.getByText(' Reset ', { exact: true });
        this.pathToSendEmail = page.locator('.sendmail-path-value');
        this.translateIcon = this.page.locator('.oxd-icon.bi-translate');
        this.languageName = this.page.locator("(//input[@class='oxd-input oxd-input--active'])[2]");
        this.addIcon = this.page.locator('.oxd-icon.bi-person-plus-fill').first();
        this.nameSubscriber = this.page.locator('input.oxd-input.oxd-input--active').first();
        this.emailSubscriber = this.page.locator('input.oxd-input.oxd-input--active').nth(1);
        this.addButtonInSubscriber = this.page.locator('button.oxd-button--secondary');
        this.nameFieldInSubscriber = page.locator('.oxd-input-group:has-text("Name") input.oxd-input');
        this.emailFieldSubscriber = page.locator('input.oxd-input.oxd-input--active').nth(1);
        this.saveButtonInSubscriber = page.getByRole('button', { name: 'Save' });
        this.translateIcon = this.page.locator('.oxd-icon.bi-translate');
        this.languageName = this.page.locator("(//input[@class='oxd-input oxd-input--active'])[2]");
        this.deleteIcon = this.page.locator('i.oxd-icon.bi-trash');
        this.translateIcon = this.page.locator('.oxd-icon.bi-translate');
        this.languageName = this.page.locator("(//input[@class='oxd-input oxd-input--active'])[2]");
        this.dropdownArrow = this.page.locator('div.oxd-select-text');
        this.dropdownPanel = this.page.locator('.oxd-select-dropdown');
        this.updateSuccessToast = this.page.getByText('SuccessSuccessfully Updated', { exact: true });
        this.languageUploadIcon = this.page.getByRole('row').getByRole('button').first();
        this.languageDownload = this.page.getByRole('row').getByRole('button').nth(2);
        this.translateField = this.page.locator("(//input[@class='oxd-input oxd-input--active'])[6]");
        this.LDAPimplementation = page.getByText('Open LDAP v3', { exact: true });
        this.LdapImplementation = page.locator('.oxd-select-wrapper');
        this.microsoftActive = page.locator('.oxd-select-text-input');
        this.distinguishName = page.locator('.oxd-input.oxd-input--active').nth(0);
        this.bindPassword = page.locator('.oxd-input.oxd-input--active').nth(1);
        this.bindUserName = page.locator('.oxd-input.oxd-input--active').nth(2);
        this.enableToggle = this.page.getByRole('checkbox', { name: 'Enable' })
        this.hostField = this.page.locator('div:nth-child(2) > .oxd-input').first();
        this.postField = this.page.locator('div').filter({ hasText: /^PortIf SSL use port 636 by default$/ }).getByRole('textbox');
        this.distinguishedNameContainer = this.page.locator('div').filter({ hasText: /^Distinguished Name$/ }).first();
        this.passwordNameContainer = this.page.locator('div').filter({ hasText: /^Password$/ }).first();
        this.distinguishNameField = this.page.locator('div:nth-child(6) > .oxd-grid-3 > div > .oxd-input-group > div:nth-child(2) > .oxd-input').first();
        this.passwordField = this.page.locator('oxd-input.oxd-input--active');
        this.baseDistinguishedName = this.page.locator('div:nth-child(9) > .oxd-grid-3 > div > .oxd-input-group > div:nth-child(2) > .oxd-input').first();
        this.encryptionDropDown = this.page.locator('.oxd-icon.bi-caret-down-fill.oxd-select-text--arrow').first();
    }

    async verifySectionHeading(expectedText) {
        const headingLocator = this.page.locator(`text="${expectedText}"`);
        await expect(headingLocator).toBeVisible();
    }

    async enterMailInConfiguration(email) {
        await this.mailSentAsField.fill(email);
    }

    async clickMailMethod(methodType) {
        await this.page.locator(`//label[normalize-space()='${methodType}']`).click();
    }

    async enterSMTPPort(port) {
        await this.SMTPPort.fill(port);
    }

    async enterSMTPHost(host) {
        await this.SMTPPort.fill(host);
    }

    async toggleSendTestMailSwitch() {
        await this.sendTestMailToggle.click();
    }

    async fillTestEmailAddress(emailAddress) {
        await this.TestEmailAddressField.fill(emailAddress);
    }

    async verifySuccessToastOnSendTestMail() {
        await expect(this.testMailSuccessToast).toBeVisible();
        await this.testMailSuccessToast.waitFor({ state: "visible", timeout: 5000 });
        await expect(this.testMailSuccessToast).toContainText("SuccessTest Email Sent");
    }

    async verifySuccessToast() {
        await expect(this.saveSuccessToast).toBeVisible();
        await this.saveSuccessToast.waitFor({ state: "visible", timeout: 5000 });
        await expect(this.saveSuccessToast).toContainText("SuccessSuccessfully Saved");
    }

    async clickResetDefaultButton() {
        await this.resetDefaultButton.click();
        console.log("Reset Button is clicked");
    }

    async verifyVisibilityOfPathToSendEmail() {
        await expect(this.pathToSendEmail).toBeVisible();
    }

    async clickTranslateIconByIndex(index) {
        const icon = this.translateIcon.nth(index);
        await icon.click();
        console.log(`Clicked translate icon at index: ${index}`);
    }


    async printLanguageValue() {
        await this.languageName.waitFor({ state: 'visible' });
        const value = await this.languageName.inputValue();
        console.log(`Language Package: ${value}`);
    }

    async toggleEmailSubscription(notificationType) {
        const row = this.page.getByRole('row', { name: notificationType });
        const toggle = row.locator('span.oxd-switch-input');
        await toggle.click();
    }

    async addUserToNotificationType(notificationType, userName, userEmail) {
        const row = this.page.getByRole('row', { name: notificationType });
        const addButtonInEmailSubscription = row.locator('button:has(i.bi-person-plus-fill)');
        await addButtonInEmailSubscription.click();
        await this.addButtonInSubscriber.click();
        await expect(this.nameFieldInSubscriber).toBeVisible();
        await this.nameFieldInSubscriber.fill(userName);
        await this.emailFieldSubscriber.fill(userEmail);
        await this.saveButtonInSubscriber.click();
    }

    async emailGeneratorUnique() {
        return `user${Date.now()}@example.com`;
    }

    async clickTranslateIconByIndex(index) {
        const icon = this.translateIcon.nth(index);
        await icon.click();
        console.log(`Clicked translate icon at index: ${index}`);
    }

    async printLanguageValue() {
        await this.languageName.waitFor({ state: 'visible' });
        const value = await this.languageName.inputValue();
        console.log(`Language Package: ${value}`);
    }

    async clickAddIcon() {
        await this.addIcon.click();
    }

    async deleteButtonByIndex(index) {
        const deleteButton = this.deleteIcon.nth(index);
        await deleteButton.click();
        const confirmDeleteButton = this.page.locator('button:has-text("Yes, Delete")');
        await confirmDeleteButton.click();
    }

    async clickTranslateIconByIndex(index) {
        const icon = this.translateIcon.nth(index);
        await icon.click();
        console.log(`Clicked translate icon at index: ${index}`);
    }

    async printLanguageValue() {
        await this.languageName.waitFor({ state: 'visible' });
        const value = await this.languageName.inputValue();
        console.log(`Language Package: ${value}`);
    }

    async changeDateFormatOption(formatText) {
        await this.dropdownArrow.nth(1).click();
        const option = this.dropdownPanel.locator('.oxd-select-option', { hasText: formatText });
        await option.click();
    }

    async verifyDateUpdateSuccessToast() {
        await expect(this.updateSuccessToast).toBeVisible();
        await this.updateSuccessToast.waitFor({ state: "visible", timeout: 5000 });
        await expect(this.updateSuccessToast).toContainText("SuccessSuccessfully Updated");
    }

    async verifyDropdownOptions(dropdownIndex, expectedOptions) {
        await this.dropdownArrow.nth(dropdownIndex).click();
        const dropdown = this.page.locator('.oxd-select-dropdown[role="listbox"]');
        await dropdown.waitFor({ state: 'visible', timeout: 5000 });
        const actualOptions = await dropdown.locator('.oxd-select-option').allInnerTexts();
        for (const option of expectedOptions) {
            expect(actualOptions).toContain(option);
        }
    }

    async AddLanguagePackage(languageName) {
        await this.dropdownArrow.click();
        const option = this.dropdownPanel.locator('.oxd-select-option', { hasText: languageName });
        await option.click();
    }

    async clickUploadLanguage() {
        await this.languageUploadIcon.click()
    }

    async clickBrowseLanguageButton() {
        await this.page.getByText('Browse').click();
    }

    async uploadFileError() {
        const isVisible = await this.page.getByText('File type not allowed').isVisible();
        return isVisible;
    }

    async fileUpload() {
        const path = require('path');
        const filePath = path.resolve(__dirname, '../test-data/logo.png');
        await this.page.setInputFiles('input[type="file"]', filePath);
    }

    async downloadLanguage() {
        await this.languageDownload.click();
    }

    async enterTranslateText(name) {
        await this.translateField.fill(name)
    }
    async selectLdapImplementation() {
        await this.LDAPimplementation.click();
        console.log("LDAP implementation selected");
    }
    async selectLdapImplementationOption() {
        await this.LdapImplementation.click();
        console.log("LDAP implementation option selected");
    }
    async selectMicrosoftActive() {
        await this.microsoftActive.click();
        console.log("Microsoft Active Directory selected");
    }

    async enterDistinguishName(name) {
        await this.distinguishName.fill(name);
        console.log("Distinguish Name entered");
    }

    async enableToggleButton() {
        await this.enableToggle.click();
        console.log("Enable toggle button clicked");
    }

    async addClientByEmptyField() {
        await this.page.getByRole('button', { name: ' Add' }).click();
    }

    async clickClientToggle() {
        await this.page.locator('form span').first().click();
    }

    async toggleEnable(index) {
        const toggle = this.page.locator('.oxd-switch-input.oxd-switch-input--active.--label-right').nth(index);
        await toggle.click();
    }

    async enableToggleIfNeeded(index) {
        const toggle = this.page.locator('.oxd-switch-input.oxd-switch-input--active.--label-right').nth(index);
        const state = await toggle.waitFor({ state: 'visible' });
        console.log(`Toggle state: ${state}`);
    }

    async addClientByValidField() {
        await this.page.getByRole('button', { name: ' Add' }).click();
        await this.page.getByRole('textbox').nth(1).fill('ABC123');
        await this.page.locator('.oxd-input.oxd-input--active').nth(1).fill(' Description 123 abc test');
        await this.page.getByRole('button', { name: 'Save' }).click();
        console.log("Client added with valid fields");
    }

    async enterInHostField(value) {
        await this.hostField.fill(value);
    }

    async enterInPortField(value) {
        await this.postField.fill(value);
    }

    async emptyFieldErrorMessage() {
        await this.page.getByText('Required').isVisible();
    }

    async clickBindAnonymouslyToggle() {
        await this.page.locator('form span').nth(1);
    }

    async verifyDistinguishedNameVisible() {
        await expect(this.distinguishedNameContainer).toBeVisible();
    }

    async verifyPasswordVisible() {
        await expect(this.passwordNameContainer).toBeVisible();
    }

    async enterDistinguishName(name) {
        await this.distinguishNameField.fill(name);
    }

    async enterPasswordField(pass) {
        await this.bindPassword.fill(pass);
    }

    async enterBaseDistinguishedName(name) {
        await this.baseDistinguishedName.fill(name);
    }

    async clickEncryptionDropDown() {
        await this.encryptionDropDown.click();
    }

    async clickTLSOption() {
        await this.page.getByRole('option', { name: 'TLS' }).click();
    }

    async clickSSLOption() {
        await this.page.getByRole('option', { name: 'SSl' }).click();
    }

    async clickAddButton() {
        await this.page.getByRole('button', { name: ' Add' }).click();
    }

    async enterName(text) {
        await this.page.getByRole('textbox').nth(1).fill(text);
    }

    async ProviderUrl(url) {
        await this.page.getByRole('textbox').nth(1).fill(url);
    }

    async clientId(ID) {
        await this.page.getByRole('textbox').nth(3).fill(ID);
    }

    async clientSecret(pass) {
        await this.page.locator('input[type="password"]').fill(pass);
    }

    async saveButton() {
        await this.page.getByRole('button', { name: 'Save' }).click();
    }
}

module.exports = { AdminConfigurationPage }